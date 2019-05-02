import rotaService from "../services/rota";
import { getMostValuablePoints } from "../services/points";
import moment from "moment";
import var_dump from "var_dump";

class Rota {
	getAvaiableRotas (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");

		let respObj = {};

		try {
			let params = JSON.parse(req.body);
			let dtDoacao = moment(params.data, 'YYYY-MM-DD').format('DD/MM/YYYY');

			var_dump(params);
			var_dump(dtDoacao);
			rotaService.getAvaiableRotas(dtDoacao).then((response) => {
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
			const qtdPessoas = params.qtdPessoas;
			const nomeRota = params.nomeRota;
			const rotaMapsApi = params.rotaMaps;
			const rotaUsuario = params.rotaUsuario;

			const respObj = {
				message : "Salvo com sucesso !",
				idRota: 0
			};

			const newPointsMapsAPI = getMostValuablePoints(rotaMapsApi.points);

			var_dump( newPointsMapsAPI );

			rotaService.addRota(nomeRota, qtdPessoas).then((response) => {
				respObj.idRota = response.insertId;
				console.log("Gravou rota com sucesso");
				console.log(response.insertId);

				rotaMapsApi.points.forEach(function (ponto, index) {
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
			var_dump(e);
			res.json(respObj);
			next();
		}
	}

	getRotaPorId(req, res, next){
		res.setHeader("Access-Control-Allow-Origin", "*");
		let respObj = {};

		try {
			let params = JSON.parse(req.body);
			let idRota = params.idRota;

			var_dump(params);
			var_dump(idRota);

			rotaService.getRotaPorId(idRota).then((response) => {
				respObj.rota = response;
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
}

export default new Rota ();
