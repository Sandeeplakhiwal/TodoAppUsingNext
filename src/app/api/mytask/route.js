import { asyncError, errorHandler } from "@latest/middlewares/error";
import { Task } from "@latest/models/task";
import { connectDB } from "@latest/utils/features";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = asyncError(async (req) => {
  connectDB();

  const theToken = cookies().get("token");

  if (!theToken)
    return errorHandler(NextResponse, 401, "Not Logged In You Are");

  const decoded = jwt.verify(theToken.value, process.env.JWT_SECRET);

  const tasks = await Task.find({ user: decoded._id });

  return NextResponse.json(
    {
      success: true,
      tasks,
    },
    { status: 200 }
  );
});
