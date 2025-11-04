import { Router, } from "express"
import { TranslateController } from "../controllers/translateController";
const router = Router();

router.post("/", TranslateController.translate);

export default router;
