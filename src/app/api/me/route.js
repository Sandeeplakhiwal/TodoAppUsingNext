import { asyncError, errorHandler } from "@latest/middlewares/error";
import { User } from "@latest/models/user";
import { connectDB } from "@latest/utils/features";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = asyncError(async (req) => {
  connectDB();
  const theToken = cookies().get("token").value;
  if (!theToken) return errorHandler(NextResponse, 400, "Not Logged In");
  const decoded = jwt.verify(theToken, process.env.JWT_SECRET);
  const user = await User.findById(decoded._id);
  return NextResponse.json(
    {
      success: true,
      user,
    },
    { status: 200 }
  );
});
