import jwt from "jsonwebtoken";

export const genToken = (user) =>
    jwt.sign(
        {
            iss: process.env.JWT_PRIVATE_SECRET,
            sub: user.id,
            role: user.role,
            iat: new Date().getTime(),
            exp: new Date().setHours(new Date().getHours() + 1),
            // exp: new Date().setDate(new Date().getDate() + 1),
        },
        process.env.JWT_PRIVATE_SECRET
    );
