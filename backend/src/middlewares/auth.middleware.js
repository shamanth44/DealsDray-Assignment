import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken 
      ||
      req.header("Authorization")?.replace("Bearer ", "");
      // console.log(token)

    if (!token) {
      throw new ApiError(401, "Unauthorized request 1");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const admin = await Admin.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!admin) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.admin = admin;
    // console.log(admin)

    next();
    
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
