import acaoCtl from "../controllers/acao";
const router = new (require("restify-router")).Router();

router.post("/", acaoCtl.getAllAcoes);

export default router;
