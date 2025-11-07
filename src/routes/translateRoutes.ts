import { Router } from "express";
import {
  translate,
  translateMultipleLanguages,
} from "../controllers/translateController";
const router = Router();

router.post("/", translate);
router.post("/multiple", translateMultipleLanguages);
export default router;
