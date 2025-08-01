
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";



const verifyJWT = asyncHandler(async (req, res, next) => {

    const token = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];

  
    if (!token) {
        throw new apiErrors(401, "You are not authorized to access this route .Need Login");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decoded);
        const user = await User.findById(decoded?.id).select("-password -refreshToken")
        // console.log(user);
        if (!user) {
            throw new apiErrors(404, "User not found");
        }
        req.user = user;

        next();
    } catch (error) {
        throw new apiErrors(401, error?.message || "Invalid token");
    }
});


export {verifyJWT};