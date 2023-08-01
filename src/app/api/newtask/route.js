import { connectDB, isAuthenticated } from "@latest/utils/features";
import { NextResponse, NextRequest } from "next/server";
import { Task } from "@latest/models/task";
import { asyncError, errorHandler } from "@latest/middlewares/error";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@latest/models/user";

export const POST = asyncError(async (req) => {
  await connectDB();

  const { title, description } = await req.json();

  if (!title || !description)
    return errorHandler(NextResponse, 400, "Please enter all fields");

  const theToken = cookies().get("token");
  if (!theToken) return errorHandler(NextResponse, 401, "Not Logged In");
  const decoded = jwt.verify(theToken.value, process.env.JWT_SECRET);

  const task = await Task.create({
    title,
    description,
    user: decoded._id,
  });
  return NextResponse.json({ success: true, task });
});
