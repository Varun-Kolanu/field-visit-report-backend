import express from "express";
import { createReport, getReportById, getReports } from "../controllers/reports.js";

const router = express.Router();
router.route("/").get(getReports).post(createReport);
router.route("/:id").get(getReportById)
export default router;