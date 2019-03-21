import doacaoRouter from "./doacao";
import rotaRouter from "./rota";

const DOACAO_ROUTER_PREFIX = "/doacao";
const REGIAO_ROUTER_PREFIX = "/rota";

let registerRoutes = () => {
	const router = new (require("restify-router")).Router();

	router.add(DOACAO_ROUTER_PREFIX, doacaoRouter);
	router.add(REGIAO_ROUTER_PREFIX, rotaRouter);

	return router;
};

export default registerRoutes();