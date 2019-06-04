import dbService from "../util/db";
class Doador {
	constructor() {
		this.GET_ALL_ACOES_BY_DOADOR =	"SELECT A.`NOMEACAO` FROM `acoesdoador` AS AD JOIN `acao` A ON A.`ID` = AD.`IDACAO` WHERE AD.`IDDOADOR` = @idDoador ORDER BY 1";
		this.GET_ALL_DOADORES =	"SELECT D.`ID`, D.`CPFCNPJ`, D.`NOMDOADOR`, D.`TELEFONE`, D.`CELULAR`, D.`EMAIL`,  D.`OBSERVACAO`, D.`STATUS` FROM `doador` AS D ORDER BY 1";
		this.GET_DOADORES_POR_STATUS = "SELECT `CPFCNPJ`, `NOMDOADOR`, `TELEFONE`, `CELULAR`, `EMAIL`, `OBSERVACAO`, `STATUS` FROM `doador` WHERE `STATUS` = @status ORDER BY 1";
		this.ATIVAR_DOADOR = "UPDATE `doador` SET `STATUS` = 1 WHERE `ID` = @idDoador";
		this.INSERT_DOADOR = "INSERT INTO `doador`(`CPFCNPJ`, `NOMDOADOR`, `TELEFONE`, `CELULAR`, `EMAIL`, `OBSERVACAO`, `STATUS`) VALUES (@cpfCnpj, @nomDoador, @telefone, @celular, @email, @observacao, 0)";
		this.INSERT_DOADOR_ACAO = "INSERT INTO `acoesdoador`(`IDDOADOR`, `IDACAO`) VALUES (@idDoador, @idAcao)";
		this.REMOVER_DOADOR = "DELETE FROM `doador` WHERE `ID` = @idDoador";
	}

	getAllDoadores () {
		let promises = [];
		let queryParams, 
			resultado = [],
			acoesAux;

		return dbService.runQuery(this.GET_ALL_DOADORES, false).then(
			doadores => {					
				doadores.forEach(doador => {
					resultado.push(doador);
					queryParams = {
						idDoador: doador.ID
					};
					
					promises.push(dbService.runQuery(this.GET_ALL_ACOES_BY_DOADOR, queryParams).then(result => {
						doador.ACOES = result.map(acao => acao.NOMEACAO);
						return acoesAux; 
					}));
				});

				return Promise.all(promises).then(() => {
					return resultado;
				}).catch(e => { throw e });			
			}
		);
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
			idDoador : doador.donatorId
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
			observacao : doador.observacao,
		};
		
		return dbService.runQuery(this.INSERT_DOADOR, queryParams, result => {
			return result;
		});
	}

	addAcoesDoador(doador) {
		const promises = [];
		const idDoador = doador.id; 
		let queryParams;

		doador.idAcao.forEach(idAcao => {
			queryParams = {
				idDoador: idDoador,
				idAcao : idAcao
			};

			promises.push(dbService.runQuery(this.INSERT_DOADOR_ACAO, queryParams, result => {
				return result;
			}));
		});

		return Promise.all(promises);
	}

	removerDoador(doador){
		const queryParams = {
			idDoador : doador.id
		};

		return dbService.runQuery(this.REMOVER_DOADOR, queryParams, result => {
			return result;
		});
	}

}
export default new Doador ();
