import dbService from "../util/db";

class Doacao {
	constructor() {
		this.GET_ALL_DOACOES = "SELECT * FROM DOACAO ORDER BY 1";
	}
    
	getAllDoacoes () { 
		return dbService.runQuery(this.GET_ALL_DOACOES, false, result => {
			console.log(result);
			return result;
		});
	}
}

export default new Doacao ();