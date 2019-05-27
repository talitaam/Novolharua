import dbService from "../util/db";
import { getMostValuablePoints, getCommomPoints, truncateCoordinates, compressArrayPoints, getTrechosComOverlap } from './points';
import var_dump from "var_dump";

class Rota {
	constructor() {
		this.GET_ALL_ROTAS = "SELECT ID, NMROTA, ORIGEM, DESTINO, DISTANCIA, NUMPESSOASMIN, NUMPESSOASMAX, OBSERVACAO, DTINCLUSAO FROM ROTAMAPS";
		this.GET_PONTOS_ROTA = "SELECT RM.ID, LAT, LNG FROM ROTAMAPS RM JOIN PONTOUSUARIO PU ON RM.ID = PU.IDROTA WHERE IDROTA = @idRota ORDER BY IDORDEMPONTO";
		this.GET_PONTOS_MAPS_ROTA = "SELECT LAT, LNG FROM ROTAMAPS RM JOIN PONTOMAPS PU ON RM.ID = PU.IDROTA WHERE IDROTA = @idRota ORDER BY IDORDEMPONTO";
		this.INSERT_ROTA = "INSERT INTO `ROTAMAPS`(`NMROTA`, `ORIGEM`, `DESTINO`, `DISTANCIA`, `NUMPESSOASMIN`, `NUMPESSOASMAX`, `OBSERVACAO`, `DTINCLUSAO`) VALUES ( @nomeRota, @origem, @destino, @distancia, @numMinPessoas, @numMaxPessoas, @observacao, now())";
		this.INSERT_PONTO_MAPS = "INSERT INTO `PONTOMAPS`(`IDORDEMPONTO`,`IDROTA`, `LAT`, `LNG`) VALUES ( @idOrdemPonto, @idRota, @lat, @lng)";
		this.INSERT_PONTO_USUARIO = "INSERT INTO `PONTOUSUARIO`(`IDORDEMPONTO`,`IDROTA`, `LAT`, `LNG`) VALUES ( @idOrdemPonto, @idRota, @lat, @lng)";
		this.SELECT_ROTA_POR_ID = "SELECT RM.*, PM.* FROM ROTAMAPS RM JOIN PONTOMAPS PM ON RM.ID = PM.IDROTA WHERE RM.ID = @idRota";
		this.GET_ROUTE_BY_POINT = "SELECT RM.ID FROM ROTAMAPS RM JOIN PONTOMAPS PM WHERE PM.ID IN (SELECT ID FROM PONTOMAPS WHERE PM.LAT = @lat AND PM.LNG = @lng)";
		this.GET_ROUTES_BY_DATE = "SELECT ID, NMROTA, ORIGEM, DESTINO, DISTANCIA, NUMPESSOASMIN, NUMPESSOASMAX, OBSERVACAO, DTINCLUSAO FROM ROTAMAPS WHERE ID NOT IN (SELECT IDROTA FROM DOACAO WHERE DATE_FORMAT(DTDOACAO, '%d/%m/%Y') = @dataFiltrada )";
	}

	addRota(rota) {
		return dbService.runQuery(this.INSERT_ROTA, rota, result => {
			return result;
		});
	}

	addPontoUsuario(idOrdemPonto, idRota, latitude, longitude) {
		const queryParams = {
			idOrdemPonto: idOrdemPonto,
			idRota: idRota,
			lat: latitude,
			lng: longitude
		};

		return dbService.runQuery(this.INSERT_PONTO_USUARIO, queryParams, result => {
			return result;
		});
	}

	addPontoMaps(idOrdemPonto, idRota, latitude, longitude) {
		const queryParams = {
			idOrdemPonto: idOrdemPonto,
			idRota: idRota,
			lat: latitude,
			lng: longitude
		};

		return dbService.runQuery(this.INSERT_PONTO_MAPS, queryParams, result => {
			return result;
		});
	}

	getAllRotas() {
		return dbService.runQuery(this.GET_ALL_ROTAS)
			.then(result =>
				result.map(rota => ({
					id: rota.ID,
					label: rota.NMROTA,
					value: rota.ID
				}))
			);
	}

	getPontosRota(id) {
		const queryParams = {
			idRota: id
		};

		return dbService.runQuery(this.GET_PONTOS_ROTA, queryParams)
			.then(result => result.map(ponto => {
					return ({
						lat: ponto.LAT,
						lng: ponto.LNG
					});
				})
			);
	}

	getRoutesByDate(date) {
		const queryParams = {
			dataFiltrada: date
		};

		return dbService.runQuery(this.GET_ROUTES_BY_DATE, queryParams)
			.then(result =>
				result.map(rota => ({
					id: rota.ID,
					label: rota.NMROTA,
					value: rota.ID
				}))
			);
	}

	getSignificantPoints ( points ) {
		const pointsNormalDirection    = getMostValuablePoints(points.slice(0));
		const pointsBackwardsDirection = getMostValuablePoints(points.slice(0).reverse());

		const routePoints = getCommomPoints(pointsNormalDirection, pointsBackwardsDirection);

		const turfPoints = routePoints.map((point) => [point.lat, point.lng]);
		const truncatedRoute = truncateCoordinates (turfPoints); 		
	
		return truncatedRoute.geometry.coordinates; 				   
	}

	mergePointsArrays( pointsArrA, pointsArrB) {
		return compressArrayPoints(pointsArrA.concat(pointsArrB.slice(0).reverse()));
	}

	overlapsExistingRoute(routePoints) {
		try {
			return this.findConflitantRoute(routePoints).then(conflitantRoutes => {				
				if( conflitantRoutes.length !== 0 ) {
					return conflitantRoutes.filter(route => route.points.length > 0)
										   .map(( route) => this.getConflitantRoutes(route.id, route.points, routePoints)); 
				} else {
					return false;				
				}
			});
		} catch (e) {
			throw e;
		}	
	}

	findConflitantRoute(route) {
		const promises = [];
		const returnedRoutes = [];
		let queryParams, 
			promise;

		route.forEach(([lat, lng]) => {
			queryParams = {
				'lat': lat, 
				'lng': lng
			};

			promise = dbService .runQuery(this.GET_ROUTE_BY_POINT, queryParams)
								.then(result => { 
									returnedRoutes.push(result);
								});
			
			promises.push(promise);
		});

		return Promise	.all(promises)
						.then(() => {
			return this.minifyRoutes( returnedRoutes );
		});
	}

	minifyRoutes(arrayOfRoutes) {
		const mappedRoutes = [];
		const promises = [];

		arrayOfRoutes.forEach( routesIds => {
			routesIds.forEach( route => {
				if ( mappedRoutes.indexOf(route.ID) === -1 ) {
					 mappedRoutes.push(route.ID);
				}
			});
		});
		
		mappedRoutes.forEach((id) => {
			const queryParams = {
				'idRota': id
			};

			promises.push(dbService.runQuery(this.GET_PONTOS_MAPS_ROTA, queryParams).then( result => {
				return {
					'id': id,
					'points': result
				};
			}));	
		});

		return Promise.all(promises);	
	}

	getConflitantRoutes(conflitantRouteId, conflitantRoute, toSaveRoute) {
		const route = conflitantRoute.map(point => [parseFloat(point.LAT), parseFloat(point.LNG)]);
		const trechoComOverlap = getTrechosComOverlap(route, toSaveRoute);
		const result = {
			id: conflitantRouteId,
			isValidOverlap: (trechoComOverlap.length > 0)
		};

		if(result.isValidOverlap) {
			result.overlapRoute = conflitantRoute;
		} else {
			result.overlapRoute = null;
		}

		return result;
	} 
}

export default new Rota ();
