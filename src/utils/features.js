import { serialize } from "cookie";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { errorHandler } from "@latest/middlewares/error";
import { User } from "@latest/models/user";
import { cookies } from "next/headers";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected with ${connection.host}`);
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
};

export const cookieSetter = (res, token, set) => {
  return cookies().set("token", set ? token : "", {
    path: "/",
    httpOnly: true,
    maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
  });
};

export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

export const isMatch = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const isAuthenticated = async (cookies, res) => {
  let token = cookies().get("token");
  if (!token) return errorHandler(res, 401, "Not Logged In");
  const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
  const user = decoded._id;
  return user;
};
