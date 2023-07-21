import express from "express";
import mongoose from "mongoose";

const specialKeys = ["$ne", "$nin", "$gt", "$lt", "$gte", "$lte", "$exists", "$regex", "$options"];

function formatFilters(filters: Record<string, any>) {
    const formatted: Record<string, any> = {};
    for (const key in filters) {
        try {
            const jsonValue = JSON.parse(filters[key]);
            if (typeof jsonValue === "object" && Object.keys(jsonValue).every((key) => specialKeys.includes(key))) {
                formatted[key] = jsonValue;
            } else {
                formatted[key] = filters[key];
            }
        } catch (err) {
            formatted[key] = filters[key];
        }
    }
    return formatted;
}

export default function crudRouter<M = Record<string, any>>(model: mongoose.Model<M>) {
    const router = express.Router();

    router.get("/", async (req, res) => {
        try {
            const {
                sort = "{}",
                select = "{}",
                limit = Number.MAX_SAFE_INTEGER,
                skip = 0,
                populate,
                total = false,
                ...filters
            } = req.query;
            const formattedFilters = formatFilters(filters);
            const items = await model
                .find({
                    removed: false,
                    ...formattedFilters,
                })
                .sort(JSON.parse(sort as string))
                .populate(populate as string)
                .select(JSON.parse(select as string))
                .skip(Number(skip))
                .limit(Number(limit));
            const result = total ? {
                data: items,
                total: await model.count({
                    removed: false,
                    ...formattedFilters,
                }),
            } : items;

            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    router.get("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const { populate = "" } = req.query;
            const item = await model.findById(id).populate(populate as string);
            res.send(item);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    router.post("/", async (req, res) => {
        try {
            const item = await model.create({
                // @ts-ignore
                createdBy: req.user._id,
                ...req.body,
            });
            res.send(item);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    router.patch("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const item = await model.findByIdAndUpdate(
                id,
                {
                    // @ts-ignore
                    updatedBy: req.user._id,
                    ...req.body,
                },
                { new: true }
            );

            res.send(item);
        } catch (error) {
            // TODO: make error handler and use it everywhere
            if (error instanceof Error) {
                res.status(500).send({ message: error.message, name: error.name, stack: error.stack });
                return;
            }
            res.status(500).send(error);
        }
    });

    router.delete("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const item = await model.findByIdAndDelete(id);
            res.send(item);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    return router;
}
