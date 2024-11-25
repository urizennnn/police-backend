import { Router } from "express";
import AdminRoutes from "./admin/admin.routes";
import CaseRoutes from "./case/case.routes";
import EvidenceRoutes from "./evidence/evidence.routes";
import OfficerRoutes from "./officers/officer.routes";
import ReportRoutes from "./report/report.routes";
import DashboardRoutes from "./dashboard/routes";

const router = Router();
router.use("/admin", AdminRoutes);
router.use("/case", CaseRoutes);
router.use("/evidence", EvidenceRoutes);
router.use("/officer", OfficerRoutes);
router.use("/report", ReportRoutes);
router.use("/dashboard", DashboardRoutes);

export default router;
