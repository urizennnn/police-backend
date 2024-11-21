import { Router } from "express";
import AdminRoutes from "./admin/admin.routes";
import CaseRoutes from "./case/case.routes";
import EvidenceRoutes from "./evidence/evidence.routes";
import OfficerRoutes from "./officers/officer.routes";
import ReportRoutes from "./report/report.routes";

const router = Router();
router.use("/admin", AdminRoutes);
router.use("/case", CaseRoutes);
router.use("/evidence", EvidenceRoutes);
router.use("/officer", OfficerRoutes);
router.use("/report", ReportRoutes);

export default router;
