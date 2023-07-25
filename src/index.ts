import { config } from "dotenv";
config();
import express from "express";
import passport from "passport";
// import cookieParser from "cookie-parser";
import morgan from "morgan";
import { checkCors, authenticate, authenticateAdmin } from './utils/middlewares';
import "./utils/mongoConnect"
import "./services/passport"

import authRouter from "./controllers/auth";
import animalSubTypesRouter from "./controllers/animalSubTypesCont"
import usersRouter from "./controllers/user";
import animalTypesRouter from "./controllers/animalTypes";
import spendingsRouter from "./controllers/spendings";
import animalsRouter from "./controllers/animals";
import weightsRouter from "./controllers/weights";
import getAnimalsDiedRouter from "./controllers/getAnimalsDied"
import notificationsRouter from "./controllers/notifications";
import selectFieldsRouter from "./controllers/selectFields";
import selectSubFieldsRouter from "./controllers/selectSubFields";
import AnimalsProblemsRouter from "./controllers/animalsProblems";
import getAnimalsSoldRouter from "./controllers/getAnimalsSold"
import getChildrensRouter from "./controllers/animalsChildrens"

const app = express();

const port = process.env.PORT;

process.on("uncaughtException", (error) => {
  console.log(error, "error");
});

app.use(morgan('dev', { skip: (req, _res) => req.method === "OPTIONS" }))
app.use(passport.initialize());
app.use(checkCors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/users", authenticateAdmin, usersRouter);
app.use("/api/animal-types", authenticate, animalTypesRouter);
app.use("/api/animals", authenticate, animalsRouter);
app.use("/api/weights", authenticate, weightsRouter);
app.use("/api/notifications", authenticate, notificationsRouter);
app.use("/api/get-animals-childrens", authenticate, getChildrensRouter)
app.use("/api/select-fields", authenticate, selectFieldsRouter);
app.use("/api/spendings", authenticate, spendingsRouter )
app.use("/api/select-sub-fields", authenticate, selectSubFieldsRouter);
app.use("/api/animalsubtype", authenticate, animalSubTypesRouter)
app.use("/api/animalproblems", authenticate, AnimalsProblemsRouter )
app.use("/api/get-animals-died", authenticate, getAnimalsDiedRouter)
app.use("/api/get-animals-sold", authenticate, getAnimalsSoldRouter)
if (port) {
  app.listen(port, () => {
    console.info(`App started: listening at http://localhost:${port}/`);
  });
} else {
  app.listen(() => {
    console.info(`App started`);
  });
}

