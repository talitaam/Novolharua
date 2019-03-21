import dbService from "../util/db";

class Rota {
	constructor() {
		this.GET_AVAIABLE_ROTAS = "SELECT IDROTA, NMROTA FROM ROTA WHERE IDROTA NOT IN (SELECT IDROTA FROM DOACAO WHERE DTDOACAO = @DTDOACAO) ORDER BY 1";
	}

	getAvaiableRotas (dtDoacao) {
		let queryParams = {
			DTDOACAO : dtDoacao 
		};
		
		return dbService.runQuery(this.GET_AVAIABLE_ROTAS, queryParams).then(result => {
			return result;
		});
	}       
}

export default new Rota ();