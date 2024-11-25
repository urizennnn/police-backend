import { Router } from "express";
import { createCase, getCase, getCases, updateCase } from "./case.controller";

const router = Router();

router.post("/create", createCase);
router.get("/", getCases);
router.post("/", getCase);
router.patch("/:caseId", updateCase);

export default router;
