import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import { commonPreHooks, commonSchemaPaths } from ".";

const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email address"],
        required: [true, "Email is required"],
        unique: true,
    },
    role: {
        type: String,
        enum: ["admin", "editor"],
    },
    firstName: {
        type: String,
        required: [true, "First Name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 8,
    },
    ...commonSchemaPaths,
});

commonPreHooks(UsersSchema);

UsersSchema.methods.toJSON = function () {
    const user = this;

    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
};

UsersSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err) return next(err);
        this.password = passwordHash;
        next();
    });
});

UsersSchema.methods.comparePassword = function (password: string) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            if (err) return reject(err);
            resolve(isMatch);
        });
    });
};

const Users = mongoose.model("Users", UsersSchema);

export default Users;
