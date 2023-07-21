import express from "express";
import User from "../models/User";
import { genToken } from "../services/jwt";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, removed: false });

    if (!user) {
        res.status(404).send({ message: "Not found!" });
        return;
    }
    if (!(await user.comparePassword(password))) {
        res.status(403).send({ message: "Password don't match!" });
        return;
    }

    const token = genToken(user);
    res.status(200).json({
        ...user.toJSON(),
        token,
    });
});

export default authRouter;
