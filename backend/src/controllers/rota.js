import rotaService from "../services/rota";

class Rota {
	getAvaiableRotas (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		
		let respObj = {};
		try {
			let params = req.body;
			let dtDoacao = params.dtdoacao;
			
			rotaService.getAvaiableRotas(dtDoacao).then((response) => {
				respObj.rotas = response;
				console.log(response);
				res.json(respObj);
				next();
			});
			
		} catch (e) {
			console.error(e);
			respObj.error = e;
			res.json(respObj);
			next();
		}
	}
}

export default new Rota ();