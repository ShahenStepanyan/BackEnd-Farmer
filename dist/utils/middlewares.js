"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCors = exports.authenticateAdmin = exports.authenticate = void 0;
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
exports.authenticate = passport_1.default.authenticate("jwt", { session: false });
const authenticateAdmin = (req, res, next) => passport_1.default.authenticate("jwt", { session: false }, (err, user, _info) => {
    if (err) {
        return res.send(err);
    }
    if (user.role !== "admin") {
        return res.status(403).send({ message: "Permission denied!" });
    }
    req.user = user;
    next();
})(req, res);
exports.authenticateAdmin = authenticateAdmin;
exports.checkCors = (0, cors_1.default)({
    origin: (origin, callback) => {
        if (origin === process.env.WEB_URL) {
            callback(null, true);
        }
        else {
            console.log(`Not allowed by CORS origin: ${origin}`);
            callback(new Error(`Not allowed by CORS origin: ${origin}`));
        }
    },
});
//# sourceMappingURL=middlewares.js.map