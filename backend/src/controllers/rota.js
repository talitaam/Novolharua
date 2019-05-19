import rotaService from "../services/rota";
import moment from "moment";
import var_dump from "var_dump";

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

			var_dump(params);
			const nomeRota = params.nomeRota,
					  origem = params.origem,
						destino = params.destino,
						distancia = params.distancia,
						numMinPessoas = params.numMinPessoas,
						numMaxPessoas = params.numMaxPessoas,
						observacao = params.observacao,
				  	rotaMapsAPI = params.rotaMaps,
				  	rotaUsuario = params.rotaUsuario;

			const respObj = {
				message: "Salvo com sucesso !",
				idRota: 0
			};

			const rota = {
				nomeRota : nomeRota,
			    origem : origem,
				destino : destino,
				distancia : distancia,
				numMinPessoas : numMinPessoas,
				numMaxPessoas : numMaxPessoas,
				observacao : observacao
			}


			const { rotaMaps } = params;

			const newRoutePoints = rotaService.getSignificantPoints(rotaMaps);
			var_dump(newRoutePoints);

			rotaService.overlapsExistingRoute(newRoutePoints).then(bool => {
				
				// 	respObj.message = 'A rota informada sobrepõe rotas já cadastradas !';

				if (bool) {				

				// rotaService.addRota(rota).then((response) => {
				// respObj.idRota = response.insertId;
				// console.log("Gravou rota com sucesso: " + response.insertId);

				// rotaMapsAPI.points.forEach(function (ponto, index) {
				// 	console.log("Pontos - Rota Usuario");
				// 	rotaService.addPontoMaps(index, respObj.idRota, ponto.lat, ponto.lng).then((response) => {
				// 		console.log("Gravou pontoMaps com sucesso");
				// 		respObj.rotaMaps = response;

				// 		var_dump(response);
						
				// 		respObj.idRota = response.insertId;
				// 		console.log("Gravou rota com sucesso");
				// 		console.log(response.insertId);

				// 		newRoutePoints.forEach(function (ponto, index) {
				// 			rotaService.addPontoMaps(index, respObj.idRota, ponto.lat, ponto.lng).then((response) => {
				// 				respObj.rotaMaps = response;
				// 				var_dump(response);
				// 			});
				// 		});

				// 		rotaUsuario.points.forEach(function (ponto, index) {
				// 			rotaService.addPontoUsuario(index, respObj.idRota, ponto.lat, ponto.lng).then((response) => {
				// 				respObj.rotaUsuario = response;
				// 				var_dump(response);
				// 			});
				// 		});

				// 		res.json(respObj);
				// 		next();
				// 	});
				}


				
			});


		} catch (e) {
			let respObj = {
				message: "Um erro inesperado ocorreu !" + e
			};
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
				next();
			});
		} catch (e) {
			var_dump(e + '');
			respObj.error = e + '';
			res.json(respObj);
			next();
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
