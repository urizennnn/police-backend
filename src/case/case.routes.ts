import { Router } from "express";
import { createCase, getCase, updateCase } from "./case.controller";

const router = Router();

router.post("/create", createCase);
router.get("/", getCase);
router.patch("/:caseId", updateCase);

export default router;
