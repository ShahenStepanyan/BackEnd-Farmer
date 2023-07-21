"use strict";
import spendingsList from "../models/SpendingsList";
import crudRouter from "../utils/crudRouter";

const spendingsTypesRouter = crudRouter(spendingsList);

export default spendingsTypesRouter;