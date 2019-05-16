import dbService from "../util/db";
import { getMostValuablePoints, getCommomPoints, truncateCoordinates, compressArrayPoints } from './points';
import var_dump from "var_dump";

class Rota {
	constructor() {
		this.GET_ALL_ROTAS = "SELECT ID, NMROTA, QTDPESSOAS, DTINCLUSAO FROM ROTAMAPS";
		this.GET_PONTOS_ROTA = "SELECT LAT, LNG FROM ROTAMAPS RM JOIN PONTOUSUARIO PU ON RM.ID = PU.IDROTA WHERE IDROTA = @idRota ORDER BY IDORDEMPONTO";
		this.INSERT_ROTA = "INSERT INTO `ROTAMAPS`(`NMROTA`, `QTDPESSOAS`, `DTINCLUSAO`) VALUES ( @nomRota, @qtdPessoas, now())";
		this.INSERT_PONTO_MAPS = "INSERT INTO `PONTOMAPS`(`IDORDEMPONTO`,`IDROTA`, `LAT`, `LNG`) VALUES ( @idOrdemPonto, @idRota, @lat, @lng)";
		this.INSERT_PONTO_USUARIO = "INSERT INTO `PONTOUSUARIO`(`IDORDEMPONTO`,`IDROTA`, `LAT`, `LNG`) VALUES ( @idOrdemPonto, @idRota, @lat, @lng)";
		this.SELECT_ROTA_POR_ID = "SELECT RM.*, PM.* FROM ROTAMAPS RM JOIN PONTOMAPS PM ON RM.ID = PM.IDROTA WHERE RM.ID = @idRota";
		this.GET_ROUTES_BY_DATE = "SELECT ID, NMROTA, QTDPESSOAS, DTINCLUSAO FROM ROTAMAPS WHERE ID NOT IN (SELECT IDROTA FROM DOACAO WHERE DATE_FORMAT(DTDOACAO, '%d/%m/%Y') = @dataFiltrada )	";
		this.GET_ROUTE_BY_POINT = "SELECT RM.*, PM.ID, PM.LAT, PM.LNG FROM ROTAMAPS RM JOIN PONTOMAPS PM WHERE PM.ID IN (SELECT ID FROM PONTOMAPS WHERE PM.LAT = @lat AND PM.LNG = @lng)";
	}

	addRota(nomeRota, qtdPessoas) {
		let queryParams = {
			nomRota: nomeRota,
			qtdPessoas: qtdPessoas
		};

		return dbService.runQuery(this.INSERT_ROTA, queryParams, result => {
			return result;
		});
	}

	addPontoUsuario(idOrdemPonto, idRota, latitude, longitude) {
		console.log(idRota);
		console.log(latitude);
		console.log(longitude);
		let queryParams = {
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
		let queryParams = {
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
			}) );
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

	getSignificantPoints ( rotaMaps ) {
		const { points }  = rotaMaps;

		const pointsNormalDirection    = getMostValuablePoints(points.slice(0));
		const pointsBackwardsDirection = getMostValuablePoints(points.slice(0).reverse());
		
		return getCommomPoints(pointsNormalDirection, pointsBackwardsDirection);
	}

	overlapsExistingRoute(routePoints) {
		const turfPoints = routePoints.map((point) => [point.lat, point.lng]);
		const truncatedRoute = truncateCoordinates (turfPoints); 		
		
		const array = truncatedRoute.geometry.coordinates; //cria um array separa só com as coordenadas (o código funcionou só dessa maneira)
		const apagaCoordDuplicada = compressArrayPoints(array); //atribui o novo vetor à essa variável
		truncatedRoute.geometry.coordinates = apagaCoordDuplicada; //volta os valores para a variável de origem (rotaParaValidar)

		var_dump(truncatedRoute);

		findConflitantRoute();

        var rotaConflitante = turf.lineString([
			//                                      [-19.93186, -43.93861], 
			//                                      [-19.93216, -43.9387], 
			//                                      [-19.93277, -43.93886], 
			//                                      [-19.93285, -43.93858], 
											]);
		//PASSO 7 - Chamar a função lineOverlap passando a rota a ser validada e a rota retirada da tabela de pontos.
		var overlapping = turf.lineOverlap(rotaParaValidar, rotaConflitante, {tolerance: 0.005}); 
		
	}

	findConflitantRoute(route) {
		const promises = [];

		route.forEach(([lat, lng]) => {
			const promise = dbService.runQuery(this.GET_ROUTE_BY_POINT, queryParams)
									 .then(result =>
										result.map(rota => ({
											id: rota.ID,
											label: rota.NMROTA,
											value: rota.ID
										}))
									 );
			promises.push(promise);						 
		});

		return promises;
	}
}

export default new Rota ();
