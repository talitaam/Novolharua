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
			const respObj = {
				message: "Salvo com sucesso !",
				idRota: 0
			};

			const { rotaMaps } = params;

			const newRoutePoints = rotaService.getSignificantPoints(rotaMaps);
			var_dump(newRoutePoints);

			rotaService.overlapsExistingRoute(newRoutePoints).then(bool => {
				if (bool) {
					rotaService.addRota(nomeRota, qtdPessoas).then((response) => {
						var_dump(response);
						
						respObj.idRota = response.insertId;
						console.log("Gravou rota com sucesso");
						console.log(response.insertId);

						newRoutePoints.forEach(function (ponto, index) {
							rotaService.addPontoMaps(index, respObj.idRota, ponto.lat, ponto.lng).then((response) => {
								respObj.rotaMaps = response;
								var_dump(response);
							});
						});

						rotaUsuario.points.forEach(function (ponto, index) {
							rotaService.addPontoUsuario(index, respObj.idRota, ponto.lat, ponto.lng).then((response) => {
								respObj.rotaUsuario = response;
								var_dump(response);
							});
						});

						res.json(respObj);
						next();
					});
				}

				var_dump(bool);
				res.json(respObj);
				next();
			});

			// if(rotaService.overlapsExistingRoute(newRoutePoints)) {
			// 	respObj.message = 'A rota informada sobrepõe rotas já cadastradas !';
			// } else {
			// 	

			// }

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
