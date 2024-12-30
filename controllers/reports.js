import { Report } from "../models/report.js";
import { tryCatch } from "../utils/utils.js";

export const getReports = tryCatch(async (req, res, next) => {
    const reports = await Report.find()
    res.status(200).json(reports)
})

export const getReportById = tryCatch(async (req, res, next) => {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.status(200).json(report)
})

export const createReport = tryCatch(async (req, res, next) => {
    const report = req.body;
    await Report.create(report);
    res.status(201).json("Report created successfully");
})