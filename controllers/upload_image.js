import { tryCatch } from "../utils/utils.js";
import admin from "firebase-admin";
import serviceAccount from "../config/field-visit-report-file-uploads.json" assert {type: "json"}
import ErrorHandler from "../middlewares/error.js";
import path from "path";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

export const uploadImage = tryCatch(async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Define the file name and upload it to Firebase
    const blob = bucket.file(Date.now() + path.extname(req.file.originalname));
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });

    blobStream.on('error', (err) => {
        console.error(err);
        return next(new ErrorHandler("Error in uploading file" + err.message));
    });

    blobStream.on('finish', async () => {
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${blob.name}?alt=media`;
        res.status(200).send(publicUrl);
    });

    blobStream.end(req.file.buffer);
})