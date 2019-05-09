import rotaCtl from "../controllers/rota";
const router = new (require("restify-router")).Router();

router.get("/", rotaCtl.getAllRotas);

router.post("/findById", rotaCtl.getRotaById);
router.post("/findByDate", rotaCtl.getRoutesByDate);
router.post("/add", rotaCtl.addRota);

export default router;
