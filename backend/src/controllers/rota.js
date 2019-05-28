import rotaService from "../services/rota";
import var_dump from "var_dump";
import { nearest } from "@turf/turf";

class Rota {
	getAllRotas(req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");

		let respObj = {};

		try {
			rotaService.getAllRotas().then((response) => {
				respObj.rotas = response;
				res.json(respObj);
				next();
			});

		} catch (e) {
			var_dump(e);
			respObj.error = e;
			res.json(respObj);
			next();
		}
	}

	addRota(req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");

		try {
			const params = JSON.parse(req.body);
			const respObj = {
				message: ''
			};

			const { 
				nomeRota,
				origem,
				destino,
				distancia,
				numMinPessoas,
				numMaxPessoas,
				observacao,
				rotaMaps,
				rotaUsuario 
			}  = params;
			
			const rota = {
				nomeRota: nomeRota,
				origem: origem,
				destino: destino,
				distancia: distancia,
				numMinPessoas: numMinPessoas,
				numMaxPessoas: numMaxPessoas,
				observacao: observacao
			};

			const newRoutePoints 		= rotaService.getSignificantPoints(rotaMaps.points);
			const newRoutePointsReverse = rotaService.getSignificantPoints(rotaMaps.reversePoints);
			const resultedRoute         = rotaService.mergePointsArrays(newRoutePoints, newRoutePointsReverse);

			rotaService.overlapsExistingRoute( resultedRoute ).then( overlappingRoutes => {
				// 	respObj.message = 'A rota informada sobrepõe rotas já cadastradas !';

				const mappedMapsRoute = resultedRoute.map(point  => (
					{
						lat: point[0],
						lng: point[1]
					}
				));

				let validConfiltantRoutes;

				if(!!overlappingRoutes && (overlappingRoutes.length > 0)) {
					validConfiltantRoutes = overlappingRoutes.filter(item => {
						return !!item.isValidOverlap;
					});
				} else {
					validConfiltantRoutes = [];
				}
				
				var_dump(validConfiltantRoutes);
					
				if ( validConfiltantRoutes.length === 0 ) {
					rotaService.addRota(rota).then((response) => {
						const idRota = response.insertId;

						mappedMapsRoute.forEach((ponto, index) => {
							rotaService.addPontoMaps(index, idRota, ponto.lat, ponto.lng).then((response) => {
								respObj.rotaMaps = response;
							});
						});

						rotaUsuario.points.forEach(function (ponto, index) {
							rotaService.addPontoUsuario(index, idRota, ponto.lat, ponto.lng).then((response) => {
								respObj.rotaUsuario = response;
							});
						});

						respObj.message = "Salvo com sucesso.";
						res.json(respObj);
						next();
					});
				} else {
					respObj.message = "Há rotas cadastradas que soberpõe a rota informada ! Favor corrigir a sobreposição !";
					respObj.overlappingRoutes = validConfiltantRoutes;					
					res.json(respObj);
					next();				
				}
			});
		} catch (e) {
			respObj.message = "Um erro inesperado ocorreu : " + e;
			var_dump(e + "");
			res.json(respObj);
			next();
		} 
	}

	getRotaById(req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		let respObj = {};

		try {
			let params = JSON.parse(req.body);
			let routeId = params.routeId;

			rotaService.getPontosRota(routeId).then((response) => {
				respObj.rota = {
					id: routeId,
					points: response
				};
				res.json(respObj);
			});
		} catch (e) {
			var_dump(e + '');
			respObj.error = e + '';
			res.json(respObj);
		} finally {
			next();
		}
	}

	getRoutesByDate(req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		let respObj = {};

		try {
			let params = JSON.parse(req.body);
			let date = params.date;

			rotaService.getRoutesByDate(date).then((response) => {
				respObj.rotas = response;
				res.json(respObj);
				next();
			});
		} catch (e) {
			var_dump(e + '');
			respObj.error = e + '';
			res.json(respObj);
			next();
		}
	}
}

export default new Rota();
