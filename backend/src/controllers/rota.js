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
			const params 	  = JSON.parse(req.body);

			const qtdPessoas  = params.qtdPessoas, 
				  nomeRota    = params.nomeRota, 
				  rotaMapsAPI = params.rotaMaps, 
				  rotaUsuario = params.rotaUsuario;

			const respObj = {
				message : "Salvo com sucesso !",
				idRota: 0
			};

			let valuablePointsMapsAPI = getMostValuablePoints(rotaMapsAPI.points);

			var_dump( valuablePointsMapsAPI );

			rotaService.addRota(nomeRota, qtdPessoas).then((response) => {
				respObj.idRota = response.insertId;
				console.log("Gravou rota com sucesso");
				console.log(response.insertId);

				valuablePointsMapsAPI.forEach(function (ponto, index) {
					console.log(ponto.lat);
					console.log(ponto.lng);
					console.log(respObj.idRota);

					rotaService.addPontoMaps(index, respObj.idRota, ponto.lat, ponto.lng).then((response) => {
						console.log("Gravou pontoMaps com sucesso");
						respObj.rotaMaps = response;
						var_dump(response);
					});
				});

				rotaUsuario.points.forEach(function (ponto, index) {
					var_dump(ponto.lat);
					var_dump(ponto.lng);

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
}

export default new Rota ();
