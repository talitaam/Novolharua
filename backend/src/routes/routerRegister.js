import doacaoRouter from "./doacao";
import doadorRouter from "./doador";
import rotaRouter from "./rota";
import acaoRouter from "./acao";

const DOACAO_ROUTER_PREFIX = "/doacao";
const DOADOR_ROUTER_PREFIX = "/doador";
const REGIAO_ROUTER_PREFIX = "/rota";
const ACAO_ROUTER_PREFIX = "/acao";

let registerRoutes = () => {
	const router = new (require("restify-router")).Router();

	router.add(DOACAO_ROUTER_PREFIX, doacaoRouter);
	router.add(DOADOR_ROUTER_PREFIX, doadorRouter);
	router.add(REGIAO_ROUTER_PREFIX, rotaRouter);
	router.add(ACAO_ROUTER_PREFIX, acaoRouter);

	return router;
};

export default registerRoutes();
