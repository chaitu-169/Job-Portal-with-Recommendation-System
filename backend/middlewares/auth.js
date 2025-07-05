import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Token provided from cookies:", token); // Ensure token is received from cookies
    console.log("Decoded token:", decoded); // Debugging log
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }
    
    console.log("Authenticated user:", req.user); // Debugging log
    next();
  } catch (err) {
    console.error("Token error:", err); // Debugging log
    return next(new ErrorHandler("Token expired or invalid", 401));
  }
});
