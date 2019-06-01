import dbService from "../util/db";

class Doacao {
	constructor() {
		this.GET_ALL_DOACOES = "SELECT NOME, DTDOACAO, NMROTA FROM DOACAO D JOIN ROTAMAPS R ON D.IDROTA = R.ID ORDER BY 1";
		this.INSERT_DOACAO = "INSERT INTO `doacao`(`IDROTA`, `NOME`, `DTDOACAO`) VALUES ( @idRota, @nomeDoador, @dtDoacao)";
	}
    
	getAllDoacoes () { 
		return dbService.runQuery(this.GET_ALL_DOACOES, false, result => {
			return result;
		});
	}

	addDoacao (doacao) {
		let queryParams = {
			idRota : doacao.rota , 
			nomeDoador : doacao.doador, 
			dtDoacao : doacao.dtDoacao
		};

		return dbService.runQuery(this.INSERT_DOACAO, queryParams, result => {
			return result;
		});
	}	
}

export default new Doacao ();