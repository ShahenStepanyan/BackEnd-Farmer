"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
// import cookieParser from "cookie-parser";
const morgan_1 = __importDefault(require("morgan"));
const middlewares_1 = require("./utils/middlewares");
require("./utils/mongoConnect");
require("./services/passport");
const auth_1 = __importDefault(require("./controllers/auth"));
const animalSubTypesCont_1 = __importDefault(require("./controllers/animalSubTypesCont"));
const user_1 = __importDefault(require("./controllers/user"));
const animalTypes_1 = __importDefault(require("./controllers/animalTypes"));
const spendings_1 = __importDefault(require("./controllers/spendings"));
const animals_1 = __importDefault(require("./controllers/animals"));
const weights_1 = __importDefault(require("./controllers/weights"));
const getAnimalsDied_1 = __importDefault(require("./controllers/getAnimalsDied"));
const notifications_1 = __importDefault(require("./controllers/notifications"));
const selectFields_1 = __importDefault(require("./controllers/selectFields"));
const selectSubFields_1 = __importDefault(require("./controllers/selectSubFields"));
const animalsProblems_1 = __importDefault(require("./controllers/animalsProblems"));
const getAnimalsSold_1 = __importDefault(require("./controllers/getAnimalsSold"));
const animalsChildrens_1 = __importDefault(require("./controllers/animalsChildrens"));
const app = (0, express_1.default)();
const port = process.env.PORT;
process.on("uncaughtException", (error) => {
    console.log(error, "error");
});
app.use((0, morgan_1.default)('dev', { skip: (req, _res) => req.method === "OPTIONS" }));
app.use(passport_1.default.initialize());
app.use(middlewares_1.checkCors);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/auth", auth_1.default);
app.use("/api/users", middlewares_1.authenticateAdmin, user_1.default);
app.use("/api/animal-types", middlewares_1.authenticate, animalTypes_1.default);
app.use("/api/animals", middlewares_1.authenticate, animals_1.default);
app.use("/api/weights", middlewares_1.authenticate, weights_1.default);
app.use("/api/notifications", middlewares_1.authenticate, notifications_1.default);
app.use("/api/get-animals-childrens", middlewares_1.authenticate, animalsChildrens_1.default);
app.use("/api/select-fields", middlewares_1.authenticate, selectFields_1.default);
app.use("/api/spendings", middlewares_1.authenticate, spendings_1.default);
app.use("/api/select-sub-fields", middlewares_1.authenticate, selectSubFields_1.default);
app.use("/api/animalsubtype", middlewares_1.authenticate, animalSubTypesCont_1.default);
app.use("/api/animalproblems", middlewares_1.authenticate, animalsProblems_1.default);
app.use("/api/get-animals-died", middlewares_1.authenticate, getAnimalsDied_1.default);
app.use("/api/get-animals-sold", middlewares_1.authenticate, getAnimalsSold_1.default);
if (port) {
    app.listen(port, () => {
        console.info(`App started: listening at http://localhost:${port}/`);
    });
}
else {
    app.listen(() => {
        console.info(`App started`);
    });
}
//# sourceMappingURL=index.js.map