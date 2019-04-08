import dbService from "../util/db";
import moment from "moment";

class Doacao {
	constructor() {
		this.GET_ALL_DOACOES = "SELECT NOME, DTDOACAO, NMROTA FROM DOACAO D JOIN ROTA R ON D.IDROTA = R.IDROTA ORDER BY 1";
		this.INSERT_DOACAO = "INSERT INTO `doacao`(`IDROTA`, `NOME`, `DTDOACAO`) VALUES ( @idRota, @nomeDoador, @dtDoacao)";
	}
    
	getAllDoacoes () { 
		return dbService.runQuery(this.GET_ALL_DOACOES, false, result => {
			return result;
		});
	}

	addDoacao (doacao) {

		console.log(doacao);

		if(doacao.rota === "area_hospitalar") {
			doacao.rota = '1';
		} else if(doacao.rota === "praca_savassi") {
			doacao.rota = '2';
		} else if(doacao.rota === "praca_liberdade") {
			doacao.rota = '3';
		}

		let queryParams = {
			idRota : doacao.rota , 
			nomeDoador : doacao.doador, 
			dtDoacao : moment(doacao.data).format('YYYY-MM-DD')
		};

		return dbService.runQuery(this.INSERT_DOACAO, queryParams, result => {
			return result;
		});
	}	
}

export default new Doacao ();