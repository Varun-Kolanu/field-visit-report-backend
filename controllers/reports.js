import ErrorHandler from "../middlewares/error.js";
import { Report } from "../models/report.js";
import { tryCatch } from "../utils/utils.js";

export const getReports = tryCatch(async (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new ErrorHandler("You do not have permission to access all reports", 403))
    }
    let reports = await Report.find().populate("user", "name");
    reports = reports.map(report => (
        {
            _id: report._id,
            user_name: report.user.name,
            type: report.type,
            institute_name: report.institute_name,
            officers: report.officers.map(officer => officer.name).join(", "),
            start_date: report.start_date,
            end_date: report.end_date,
        }
    ))
    res.status(200).json(reports)
})

export const getReportById = tryCatch(async (req, res, next) => {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    if (req.user.role !== "admin" && report.user !== req.user._id) {
        return next(new ErrorHandler("You do not have permission to access this report", 403))
    }
    res.status(200).json(report)
})

export const createReport = tryCatch(async (req, res, next) => {
    let report = req.body;
    report.user = req.user._id;
    await Report.create(report);
    res.status(201).json("Report created successfully");
})

export const updateReport = tryCatch(async (req, res, next) => {
    const { id } = req.params;
    let report = await Report.findById(id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    if (req.user.role !== "admin" && report.user !== req.user._id) {
        return next(new ErrorHandler("You do not have permission to update this report", 403))
    }

    report = req.body;
    await Report.findByIdAndUpdate(id, report, { new: true });
    res.status(200).json({ message: "Report updated successfully", report });
});

export const deleteReport = tryCatch(async (req, res, next) => {
    const { id } = req.params;
    let report = await Report.findById(id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    if (req.user.role !== "admin" && report.user !== req.user._id) {
        return next(new ErrorHandler("You do not have permission to delete this report"))
    }
    report = await Report.findByIdAndDelete(id);

    res.status(200).json({ message: "Report deleted successfully" });
});

export const myReports = tryCatch(async (req, res, next) => {
    let my_reports = await Report.find({ user: req.user });
    my_reports = my_reports.map(report => (
        {
            _id: report._id,
            type: report.type,
            institute_name: report.institute_name,
            officers: report.officers.map(officer => officer.name).join(", "),
            start_date: report.start_date,
            end_date: report.end_date,
        }
    ))
    res.status(200).json(my_reports)
})