import dbService from "../util/db";

class Rota {
	constructor() {
		//TODO
		this.INSERT_ROTA = "INSERT ";
	}

	//TODO
	setRota(nomeRota, qtdPessoas){
		let queryParams = {
			NOM_ROTA : nomeRota,
			QTD_PESSOAS : qtdPessoas
		};

		return dbService.runQuery(this.INSERT_ROTA, queryParams, result => {
			return result;
		});
	}
}

export default new Rota ();
