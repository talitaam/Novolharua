import doacaoCtl from "../controllers/doacao";
const router = new (require("restify-router")).Router();

router.post("/", doacaoCtl.getAllDoacoes);
router.post("/add", doacaoCtl.addDoacao);

export default router;