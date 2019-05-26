import dbService from "../util/db";
import { getMostValuablePoints, getCommomPoints, truncateCoordinates, compressArrayPoints, getTrechosComOverlap } from './points';
import var_dump from "var_dump";

class Rota {
	constructor() {
		this.GET_ALL_ROTAS = "SELECT ID, NMROTA, ORIGEM, DESTINO, DISTANCIA, NUMPESSOASMIN, NUMPESSOASMAX, OBSERVACAO, DTINCLUSAO FROM ROTAMAPS";
		this.GET_PONTOS_ROTA = "SELECT LAT, LNG FROM ROTAMAPS RM JOIN PONTOUSUARIO PU ON RM.ID = PU.IDROTA WHERE IDROTA = @idRota ORDER BY IDORDEMPONTO";
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
				var_dump(ponto);

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
					var_dump('OLÁ!');
					return this.getConflitantRoutes(conflitantRoutes); 
				}
				return false;				
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
			return this.minifyRoutes(returnedRoutes);
		});
	}

	minifyRoutes(arrayOfRoutes) {
		const mappedRoutes = [];
		let test = [];

		var_dump(arrayOfRoutes);

		arrayOfRoutes.forEach( routesIds => {
			routesIds.forEach( route => {
				if ( test.indexOf(route.ID) === -1 ) {
					test.push(route.ID);
				}
			});
		});
		


		var_dump(test);

		// arrayOfRoutes.forEach( (routes, index) => {
		// 	routes.forEach ( route => {
		// 		mappedRoutes.push({
		// 			routeId: route.ID,
		// 			routeIndex: index
		// 		});
		// 	});				
		// });
		
		// var_dump(mappedRoutes);

		// const minifiedRoutes = mappedRoutes.map(({routeId, routeIndex}) => ({
		// 	routeId: routeId,
		// 	points : arrayOfRoutes[routeIndex].map(route => ([
		// 		route.LAT, route.LNG
		// 	]))
		// }));

		return minifiedRoutes;	
	}

	getConflitantRoutes(conflitantRoutes, toSaveRoute) {

		const routes = conflitantRoutes.filter(conflitantRoute => {
			var_dump(conflitantRoute);
			return (getTrechosComOverlap(conflitantRoute.points, toSaveRoute).length > 0 );
		});

		var_dump(routes);

		return routes;
	} 
}

export default new Rota ();
