import cors from "cors";
import passport from "passport";

import type { RequestHandler } from "express";

export const authenticate: RequestHandler = passport.authenticate("jwt", { session: false });

export const authenticateAdmin: RequestHandler = (req, res, next) =>
    passport.authenticate("jwt", { session: false }, (err, user, _info) => {
        if (err) {
            return res.send(err);
        }
        if (user.role !== "admin") {
            return res.status(403).send({ message: "Permission denied!" });
        }
        req.user = user;
        next();
    })(req, res);

export const checkCors = cors({
    origin: (origin, callback) => {
        if (origin === process.env.WEB_URL) {
            callback(null, true);
        } else {
            console.log(`Not allowed by CORS origin: ${origin}`);
            callback(new Error(`Not allowed by CORS origin: ${origin}`));
        }
    },
});
