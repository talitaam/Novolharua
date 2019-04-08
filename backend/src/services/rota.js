import dbService from "../util/db";

class Rota {
	constructor() {
		this.GET_AVAIABLE_ROTAS = "SELECT IDROTA, SGROTA, NMROTA FROM ROTA WHERE IDROTA NOT IN (SELECT IDROTA FROM DOACAO WHERE DTDOACAO = STR_TO_DATE(@DTDOACAO, '%d/%m/%Y')) ORDER BY 1";
	}

	getAvaiableRotas (dtDoacao) {
		let queryParams = {
			DTDOACAO : dtDoacao 
		};

		return dbService.runQuery(this.GET_AVAIABLE_ROTAS, queryParams).then(result => {
			let newArray = [];

			result.forEach((ele) => {
				newArray = newArray.concat({
					id : ele.IDROTA, 
					label : ele.NMROTA,
					value : ele.SGROTA
				});
			});

			return newArray;
		});
	}       
}

export default new Rota ();