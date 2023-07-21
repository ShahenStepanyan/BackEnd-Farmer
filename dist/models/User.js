"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const _1 = require(".");
const UsersSchema = new mongoose_1.default.Schema(Object.assign({ email: {
        type: String,
        validate: [validator_1.default.isEmail, "Please provide a valid email address"],
        required: [true, "Email is required"],
        unique: true,
    }, role: {
        type: String,
        enum: ["admin", "editor"],
    }, firstName: {
        type: String,
        required: [true, "First Name is required"],
    }, lastName: {
        type: String,
        required: [true, "Last Name is required"],
    }, password: {
        type: String,
        required: [true, "password is required"],
        minlength: 8,
    } }, _1.commonSchemaPaths));
(0, _1.commonPreHooks)(UsersSchema);
UsersSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
};
UsersSchema.pre("save", function (next) {
    if (!this.isModified("password"))
        return next();
    bcrypt_1.default.hash(this.password, 10, (err, passwordHash) => {
        if (err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});
UsersSchema.methods.comparePassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(password, this.password, (err, isMatch) => {
            if (err)
                return reject(err);
            resolve(isMatch);
        });
    });
};
const Users = mongoose_1.default.model("Users", UsersSchema);
exports.default = Users;
//# sourceMappingURL=User.js.map