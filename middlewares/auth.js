import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";
import { frontendUrl } from "../config/constants.js";
import passport from "passport";

const isAuthenticated = async (req, _, next) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return next(new ErrorHandler("Please Login first", 400))
    }

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);
    next();
}

export const cbMiddleware = (req, res, next) => {
    const state = JSON.parse(req.query.state || "{}");
    const frontend = state.frontendUrl || frontendUrl;
    const callBack = passport.authenticate("google", {
        failureRedirect: `${frontend}backend_redirect?error=unknown`,
        session: false,
    });
    req.frontendUrl = frontend;
    callBack(req, res, next);
}

export default isAuthenticated;