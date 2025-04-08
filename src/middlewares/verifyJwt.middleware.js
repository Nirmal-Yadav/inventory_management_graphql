import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJwt = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  console.log(token, "token");

  if (!token) {
    throw new ApiError(404, "user not logged in");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decodedToken) {
    new ApiError(400, "token invalid");
  }

  const user = await User.findById(decodedToken._id).select(
    "-password -refreshToken"
  );

  req.user = user;
  next();
});

export { verifyJwt };
