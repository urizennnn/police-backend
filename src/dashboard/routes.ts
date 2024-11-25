import { Router } from "express";
import { GetDashboardDetails } from "./dashboard.service";

const router = Router();

router.get("/", GetDashboardDetails);

export default router;
