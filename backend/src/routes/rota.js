import rotaCtl from "../controllers/rota";
const router = new (require("restify-router")).Router();

router.post("/", rotaCtl.getAvaiableRotas);

export default router;