import { asyncError, errorHandler } from "@latest/middlewares/error";
import { Task } from "@latest/models/task";
import { connectDB } from "@latest/utils/features";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { User } from "@latest/models/user";

export const PUT = asyncError(async (req, { params }) => {
  connectDB();
  const taskid = params.tid;
  const theToken = cookies().get("token").value;
  if (!theToken) return errorHandler(NextResponse, 401, "Not Logged In");
  const decoded = jwt.verify(theToken, process.env.JWT_SECRET);
  let task = await Task.findById(taskid);
  const user = await User.findById(decoded._id);
  if (!task) return errorHandler(NextResponse, 404, "Task not found!");
  task.isCompleted = !task.isCompleted;
  task.save();
  return NextResponse.json(
    {
      success: true,
      message: "Task updated successfully.",
    },
    { status: 200 }
  );
});

export const DELETE = asyncError(async (req, { params }) => {
  connectDB();
  const taskid = params.tid;
  const theToken = cookies().get("token").value;
  if (!theToken) return errorHandler(NextResponse, 401, "Not Logged In");
  const decoded = jwt.verify(theToken, process.env.JWT_SECRET);
  let task = await Task.findById(taskid);
  const user = await User.findById(decoded._id);
  if (!task) return errorHandler(NextResponse, 404, "Task not found!");
  await task.deleteOne();
  return NextResponse.json(
    {
      success: true,
      message: "Task deleted successfully.",
    },
    { status: 200 }
  );
});
