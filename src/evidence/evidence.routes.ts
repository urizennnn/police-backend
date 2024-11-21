import { Router } from "express";
import { createEvidence, getEvidence } from "./evidence.controller";

const router = Router();

router.post("/create", createEvidence);
router.get("/", getEvidence);

export default router;
