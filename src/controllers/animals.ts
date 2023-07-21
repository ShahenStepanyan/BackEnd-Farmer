import Animals from "../models/Animals";
import crudRouter from "../utils/crudRouter";

const animalsRouter = crudRouter(Animals);

export default animalsRouter;
