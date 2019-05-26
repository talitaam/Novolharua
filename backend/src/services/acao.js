import dbService from "../util/db";

class Acao {
	constructor() {
		this.GET_ALL_ACOES = "SELECT `ID`, `NOMEACAO` FROM `acao` ORDER BY 1";
	}

	getAllAcoes () {
		return dbService.runQuery(this.GET_ALL_ACOES, false, result => {
			return result;
		});
	}
}

export default new Acao ();
