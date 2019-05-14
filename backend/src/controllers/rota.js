import rotaService from "../services/rota";
import { getMostValuablePoints } from "../services/points";
import moment from "moment";
import var_dump from "var_dump";

class Rota {
	getAllRotas (req, res, next) {
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

	addRota(req, res, next){
		res.setHeader("Access-Control-Allow-Origin", "*");
		try {
			const params = JSON.parse(req.body);
			var_dump(params);
			const nomeRota = params.nomeRota,
						numMinPessoas = param.numMinPessoas,
						numMaxPessoas = param.numMaxPessoas,
						observacao = param.observacao,
				  	rotaMapsAPI = params.rotaMaps,
				  	rotaUsuario = params.rotaUsuario;

			const respObj = {
				message : "Salvo com sucesso !",
				idRota: 0
			};

			if(rotaMapsAPI.points.length > 2){
				rotaMapsAPI.points = getMostValuablePoints(rotaMapsAPI.points);
				var_dump( rotaMapsAPI.points );
			}
				rotaService.addRota(nomeRota, numMinPessoas, numMaxPessoas, observacao).then((response) => {
				respObj.idRota = response.insertId;
				console.log("Gravou rota com sucesso: " + response.insertId);

				rotaMapsAPI.points.forEach(function (ponto, index) {
					console.log("Pontos - Rota Usuario");
					rotaService.addPontoMaps(index, respObj.idRota, ponto.lat, ponto.lng).then((response) => {
						console.log("Gravou pontoMaps com sucesso");
						respObj.rotaMaps = response;
						var_dump(response);
					});
				});

				rotaUsuario.points.forEach(function (ponto, index) {
					console.log("Pontos - Rota Usuario");
					console.log ("Lat: " + ponto.lat " / Lng: " + ponto.lng);

					rotaService.addPontoUsuario(index, respObj.idRota, ponto.lat, ponto.lng).then((response) => {
						console.log("Gravou pontoUsuario com sucesso");
						respObj.rotaUsuario = response;
						var_dump(response);
					});
				});
			});

			res.json(respObj);
			next();

		} catch (e) {
			let respObj = {
				message : "Um erro inesperado ocorreu !" + e
			};
			var_dump(e + "");
			res.json(respObj);
			next();
		}
	}

	getRotaById(req, res, next){
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

export default new Rota ();
