import dbService from "../util/db";
import { getMostValuablePoints, getCommomPoints, truncateCoordinates, compressArrayPoints } from './points';
import var_dump from "var_dump";

class Rota {
	constructor() {
		this.GET_ALL_ROTAS = "SELECT ID, NMROTA, ORIGEM, DESTINO, DISTANCIA, NUMPESSOASMIN, NUMPESSOASMAX, OBSERVACAO, DTINCLUSAO FROM ROTAMAPS";
		this.GET_PONTOS_ROTA = "SELECT LAT, LNG FROM ROTAMAPS RM JOIN PONTOUSUARIO PU ON RM.ID = PU.IDROTA WHERE IDROTA = @idRota ORDER BY IDORDEMPONTO";
		this.INSERT_ROTA = "INSERT INTO `ROTAMAPS`(`NMROTA`, `ORIGEM`, `DESTINO`, `DISTANCIA`, `NUMPESSOASMIN`, `NUMPESSOASMAX`, `OBSERVACAO`, `DTINCLUSAO`) VALUES ( @nomeRota, @origem, @destino, @distancia, @numMinPessoas, @numMaxPessoas, @observacao, now())";
		this.INSERT_PONTO_MAPS = "INSERT INTO `PONTOMAPS`(`IDORDEMPONTO`,`IDROTA`, `LAT`, `LNG`) VALUES ( @idOrdemPonto, @idRota, @lat, @lng)";
		this.INSERT_PONTO_USUARIO = "INSERT INTO `PONTOUSUARIO`(`IDORDEMPONTO`,`IDROTA`, `LAT`, `LNG`) VALUES ( @idOrdemPonto, @idRota, @lat, @lng)";
		this.SELECT_ROTA_POR_ID = "SELECT RM.*, PM.* FROM ROTAMAPS RM JOIN PONTOMAPS PM ON RM.ID = PM.IDROTA WHERE RM.ID = @idRota";
		this.GET_ROUTE_BY_POINT = "SELECT RM.*, PM.ID, PM.LAT, PM.LNG FROM ROTAMAPS RM JOIN PONTOMAPS PM WHERE PM.ID IN (SELECT ID FROM PONTOMAPS WHERE PM.LAT = @lat AND PM.LNG = @lng)";
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

	getSignificantPoints ( rotaMaps ) {
		const { points }  = rotaMaps;

		const pointsNormalDirection    = getMostValuablePoints(points.slice(0));
		const pointsBackwardsDirection = getMostValuablePoints(points.slice(0).reverse());
		
		return getCommomPoints(pointsNormalDirection, pointsBackwardsDirection);
	}

	getConflitantRoutes(routes) {
		return routes.filter(rota => !rota);
	}

	overlapsExistingRoute(routePoints) {
		const turfPoints = routePoints.map((point) => [point.lat, point.lng]);
		const truncatedRoute = truncateCoordinates (turfPoints); 		
		
		const array = truncatedRoute.geometry.coordinates; //cria um array separa só com as coordenadas (o código funcionou só dessa maneira)
		const apagaCoordDuplicada = compressArrayPoints(array); //atribui o novo vetor à essa variável
		truncatedRoute.geometry.coordinates = apagaCoordDuplicada; //volta os valores para a variável de origem (rotaParaValidar)

		const truncatedCoordinates = truncatedRoute.geometry.coordinates;
		var_dump(truncatedCoordinates);

		try {
			return this.findConflitantRoute(truncatedCoordinates).then(routes => {
				const conflitantRoutes = this.getConflitantRoutes(routes);

				var_dump( conflitantRoutes );
				
				if(conflitantRoutes.length === 0 ) {
					return true;
				} else {
					conflitantRoutes.forEach(conflitantRoute => {
						// this.GET_ROUTES_BY_ID;
					const turfConflitantRoute = turf.lineString(conflitantRoute);
					
					var_dump(turfConflitantRoute);
					
					const overlapping = turf.lineOverlap(truncatedRoute, turfConflitantRoute, {tolerance: 0.005}); 
							
					//---------------------------------- COMEÇO PASSO 8, 9 e 10  -----------------------------
					// PASSO 8 - Calcular distância entre coordenadas que foram retornadas pelo lineOverlap.
					// PASSO 9 - Invalidar a rota a ser cadastrada caso a distância seja maior que um valor pré estabelecido
					//          Serão considerados trechos superiores à 60 metros de sobreposição
					//__________________________________________ATENÇÃO______________________________________________________
					// ATENCÃO: FAZER O PASSO 6, 7 E 8 PARA TODAS AS ROTAS CONFLITANTES ENCONTRADAS NA TABELA DE PONTOS
					//__________________________________________ATENÇÃO______________________________________________________
					var trechosComOverlap = distanciaCoord(overlapping); 
					// variável que receberá os trechos que serão exibidos no mapa para o usuário para justificar a não validação
				
					//PASSO 10 - -Exibir as variáveis retornadas pelo código no mapa caso a rota é dada como inválida.
					//            exibir juntos na tela: trechosComOverlap, rotaConflitante e rotaParaValidar
					
					//           -Exibir mensagem de Cadastrado com Sucesso caso não seja encontrado nenhum trecho conflitante 
					//            em nenhuma rota buscada na tabela de pontos. (variável trechosComOverlap não retorna nada para  
					//            todas as rotasConflitantes pesquisadas.)
					
					//		 -Atualizar Tabela de Pontos assim que uma rota nova é validada e passa a ser cadastrada no sistema.
				
					});
				}
			});
		} catch (e) {
			throw e;
		}	
	}

	findConflitantRoute(route) {
		const promises = [];

		route.forEach(([lat, lng]) => {
			const queryParams = {
				'lat': lat, 
				'lng': lng
			};
			const promise = dbService.runQuery(this.GET_ROUTE_BY_POINT, queryParams)
									 .then(result => result.map(rota => rota) );
			promises.push(promise);						 
		});

		return Promise.all(promises);
	}
}

export default new Rota ();
