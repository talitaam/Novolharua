import rotaCtl from "../controllers/rota";
const router = new (require("restify-router")).Router();

router.post("/", rotaCtl.getAvaiableRotas);
router.post("/", rotaCtl.addRota);

export default router;
