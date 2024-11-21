import { Router } from "express";
import { createAdmin, loginAdmin } from "./admin.controller";

const router = Router();

router.post("/create", createAdmin);
router.post("/login", loginAdmin);

export default router;
