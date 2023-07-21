import User from "../models/User";
import crudRouter from "../utils/crudRouter";

const usersRouter = crudRouter(User);

export default usersRouter;
