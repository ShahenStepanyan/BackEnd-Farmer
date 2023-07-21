"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const specialKeys = ["$ne", "$nin", "$gt", "$lt", "$gte", "$lte", "$exists", "$regex", "$options"];
function formatFilters(filters) {
    const formatted = {};
    for (const key in filters) {
        try {
            const jsonValue = JSON.parse(filters[key]);
            if (typeof jsonValue === "object" && Object.keys(jsonValue).every((key) => specialKeys.includes(key))) {
                formatted[key] = jsonValue;
            }
            else {
                formatted[key] = filters[key];
            }
        }
        catch (err) {
            formatted[key] = filters[key];
        }
    }
    return formatted;
}
function crudRouter(model) {
    const router = express_1.default.Router();
    router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const _a = req.query, { sort = "{}", select = "{}", limit = Number.MAX_SAFE_INTEGER, skip = 0, populate, total = false } = _a, filters = __rest(_a, ["sort", "select", "limit", "skip", "populate", "total"]);
            const formattedFilters = formatFilters(filters);
            const items = yield model
                .find(Object.assign({ removed: false }, formattedFilters))
                .sort(JSON.parse(sort))
                .populate(populate)
                .select(JSON.parse(select))
                .skip(Number(skip))
                .limit(Number(limit));
            const result = total ? {
                data: items,
                total: yield model.count(Object.assign({ removed: false }, formattedFilters)),
            } : items;
            res.send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    router.get("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { populate = "" } = req.query;
            const item = yield model.findById(id).populate(populate);
            res.send(item);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const item = yield model.create(Object.assign({ 
                // @ts-ignore
                createdBy: req.user._id }, req.body));
            res.send(item);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    router.patch("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const item = yield model.findByIdAndUpdate(id, Object.assign({ 
                // @ts-ignore
                updatedBy: req.user._id }, req.body), { new: true });
            res.send(item);
        }
        catch (error) {
            // TODO: make error handler and use it everywhere
            if (error instanceof Error) {
                res.status(500).send({ message: error.message, name: error.name, stack: error.stack });
                return;
            }
            res.status(500).send(error);
        }
    }));
    router.delete("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const item = yield model.findByIdAndDelete(id);
            res.send(item);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    return router;
}
exports.default = crudRouter;
//# sourceMappingURL=crudRouter.js.map