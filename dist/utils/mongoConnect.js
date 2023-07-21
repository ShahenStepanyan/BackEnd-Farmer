"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const options = {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// };
mongoose_1.default
    .connect(process.env.DEV_DB)
    .then(() => {
    console.log(process.env.DEV_DB);
})
    .catch((err) => {
    console.log("MongoDB connection unsuccessful");
    console.log(err);
});
//# sourceMappingURL=mongoConnect.js.map