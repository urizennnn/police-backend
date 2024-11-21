import { Router } from "express";
import { createOfficer } from "./officer.controller";

const router = Router();

router.post("/create", createOfficer);

export default router;
