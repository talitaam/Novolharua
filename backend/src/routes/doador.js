import doadorCtl from "../controllers/doador";
const router = new (require("restify-router")).Router();

router.post("/", doadorCtl.getAllDoadores);
router.post("/getByStatus", doadorCtl.getDoadoresPorStatus);
router.post("/add", doadorCtl.addDoador);
router.post("/ativar", doadorCtl.ativarDoador);
router.post("/remover", doadorCtl.removerDoador);

export default router;
