import express from "express";
import { createReport, deleteReport, getReportById, getReports, myReports, updateReport } from "../controllers/reports.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();
router.route("/").get(isAuthenticated, getReports).post(isAuthenticated, createReport);
router.get("/my", isAuthenticated, myReports);
router.route("/:id").get(isAuthenticated, getReportById).put(isAuthenticated, updateReport).delete(isAuthenticated, deleteReport);
export default router;