import dbService from "../util/db";
import var_dump from "var_dump";

class Rota {
	constructor() {
		this.GET_ALL_ROTAS = "SELECT ID, NMROTA, QTDPESSOAS, DTINCLUSAO FROM ROTAMAPS";
		this.GET_PONTOS_ROTA = "SELECT LAT, LNG FROM ROTAMAPS RM JOIN PONTOUSUARIO PU ON RM.ID = PU.IDROTA WHERE IDROTA = @idRota ORDER BY IDORDEMPONTO";
		this.INSERT_ROTA = "INSERT INTO `ROTAMAPS`(`NMROTA`, `QTDPESSOAS`, `DTINCLUSAO`) VALUES ( @nomRota, @qtdPessoas, now())";
		this.INSERT_PONTO_MAPS = "INSERT INTO `PONTOMAPS`(`IDORDEMPONTO`,`IDROTA`, `LAT`, `LNG`) VALUES ( @idOrdemPonto, @idRota, @lat, @lng)";
		this.INSERT_PONTO_USUARIO = "INSERT INTO `PONTOUSUARIO`(`IDORDEMPONTO`,`IDROTA`, `LAT`, `LNG`) VALUES ( @idOrdemPonto, @idRota, @lat, @lng)";
		this.SELECT_ROTA_POR_ID = "SELECT RM.*, PM.* FROM ROTAMAPS RM JOIN PONTOMAPS PM ON RM.ID = PM.IDROTA WHERE RM.ID = @idRota";
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
}

export default new Rota();
