import AnimalTypes from "../models/AnimalTypes";
import crudRouter from "../utils/crudRouter";

const animalTypesRouter = crudRouter(AnimalTypes);

export default animalTypesRouter;
