import dbService from "../util/db";

class Doador {
	constructor() {
		this.GET_ALL_DOADORES = "SELECT `CPFCNPJ`, `NOMDOADOR`, `TELEFONE`, `CELULAR`, `EMAIL`, `IDACAO`, `OBSERVACAO`, `STATUS` FROM `doador` ORDER BY 1";
		this.GET_DOADORES_POR_STATUS = "SELECT `CPFCNPJ`, `NOMDOADOR`, `TELEFONE`, `CELULAR`, `EMAIL`, `IDACAO`, `OBSERVACAO`, `STATUS` FROM `doador` WHERE `STATUS` = @status ORDER BY 1";
		this.ATIVAR_DOADOR = "UPDATE `doador` SET `STATUS` = 1 WHERE `CPFCNPJ` = @cpfCnpj";
		this.INSERT_DOADOR = "INSERT INTO `doador`(`CPFCNPJ`, `NOMDOADOR`, `TELEFONE`, `CELULAR`, `EMAIL`, `IDACAO`, `OBSERVACAO`, `STATUS`) VALUES (@cpfCnpj, @nomDoador, @telefone, @celular, @email, @idAcao, @observacao, 0)";
		this.REMOVER_DOADOR = "DELETE FROM `doador` WHERE `CPFCNPJ` = @cpfCnpj";
	}

	getAllDoadores () {
		return dbService.runQuery(this.GET_ALL_DOADORES, false, result => {
			return result;
		});
	}

	getDoadoresPorStatus (status) {
		const queryParams = {
			status : status
		};

		return dbService.runQuery(this.GET_DOADORES_POR_STATUS, queryParams, result => {
			return result;
		});
	}

	ativarDoador(doador){
		const queryParams = {
			cpfCnpj : doador.cpfCnpj
		};

		return dbService.runQuery(this.ATIVAR_DOADOR, queryParams, result => {
			return result;
		});
	}

	addDoador (doador) {
		const queryParams = {
			cpfCnpj : doador.cpfCnpj,
			nomDoador : doador.nomDoador,
			telefone : doador.telefone,
			celular : doador.celular,
			email : doador.email,
			idAcao : doador.idAcao,
			observacao : doador.observacao
		};

		return dbService.runQuery(this.INSERT_DOADOR, queryParams, result => {
			return result;
		});
	}

	removerDoador(doador){
		const queryParams = {
			cpfCnpj : doador.cpfCnpj
		};

		return dbService.runQuery(this.REMOVER_DOADOR, queryParams, result => {
			return result;
		});
	}

}
export default new Doador ();
