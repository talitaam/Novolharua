import dbService from "../util/db";

class Rota {
	constructor() {
		this.INSERT_ROTA = "INSERT INTO `ROTAMAPS`(`NMROTA`, `QTDPESSOAS`, `DTINCLUSAO`) VALUES ( @nomRota, @qtdPessoas, now())";
		this.INSERT_PONTO_MAPS = "INSERT INTO `PONTOMAPS`(`IDORDEMPONTO`,`IDROTA`, `LAT`, `LNG`) VALUES ( @idOrdemPonto, @idRota, @lat, @lng)";
		this.INSERT_PONTO_USUARIO = "INSERT INTO `PONTOUSUARIO`(`IDORDEMPONTO`,`IDROTA`, `LAT`, `LNG`) VALUES ( @idOrdemPonto, @idRota, @lat, @lng)";
		this.SELECT_ROTA_POR_ID = "SELECT RM.*, PM.* FROM ROTAMAPS RM JOIN PONTOMAPS PM ON RM.ID = PM.IDROTA WHERE RM.ID = @idRota";
	}

	addRota(nomeRota, qtdPessoas, rotaMapsApi, rotaUsuario){
		let queryParams = {
			nomRota : nomeRota,
			qtdPessoas : qtdPessoas
		};

		return dbService.runQuery(this.INSERT_ROTA, queryParams, result => {
			return result;
		});
	}

	addPontoUsuario(idOrdemPonto, idRota, latitude, longitude){
		console.log(idRota);
		console.log(latitude);
		console.log(longitude);
		let queryParams = {
			idOrdemPonto: idOrdemPonto,
			idRota : idRota,
			lat : latitude,
			lng: longitude
		};

		return dbService.runQuery(this.INSERT_PONTO_USUARIO, queryParams, result => {
			return result;
		});
	}

	addPontoMaps(idOrdemPonto, idRota, latitude, longitude){
		let queryParams = {
			idOrdemPonto: idOrdemPonto,
			idRota : idRota,
			lat : latitude,
			lng: longitude
		};

		return dbService.runQuery(this.INSERT_PONTO_MAPS, queryParams, result => {
			return result;
		});
	}

	getRotaPorId(idRota){

	}

}

export default new Rota ();
