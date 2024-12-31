import express from "express";
import { config } from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import reportsRouter from "./routes/reports.js";
import { errorMiddleware } from "./middlewares/error.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { backendUrl } from "./config/constants.js";
import { allUsers, createGoogleUser, updateUser } from "./controllers/auth.js";
import { getAddress } from "./controllers/address.js";
import multer from "multer";
import { uploadImage } from "./controllers/upload_image.js";
import isAuthenticated from "./middlewares/auth.js";

const app = express();
config();

app.use(cors());
app.use(express.json());

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});

app.use(passport.initialize());
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${backendUrl}/api/v1/auth/google/callback`,
            scope: ["profile", "email"],
        },
        async function (accessToken, refreshToken, profile, cb) {
            return createGoogleUser(profile, cb);
        }
    )
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/reports", reportsRouter);
app.get("/api/v1/address", getAddress);
app.post("/api/v1/upload", isAuthenticated, upload.single("image"), uploadImage)

app.get("/api/v1/users", isAuthenticated, allUsers);
app.patch("/api/v1/users/:id", isAuthenticated, updateUser);


app.get("/", (_, res) => {
    res.send("Server is working");
});

app.use(errorMiddleware);

export default app;
