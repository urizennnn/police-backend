import { Router } from "express";
import {
  createOfficer,
  fetchOfficers,
  getOfficers,
} from "./officer.controller";

const router = Router();

router.post("/create", createOfficer);
router.get("/", fetchOfficers);
router.post("/fetch", getOfficers);

export default router;
