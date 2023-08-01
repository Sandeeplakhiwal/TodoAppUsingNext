import { asyncError, errorHandler } from "@latest/middlewares/error";
import { User } from "@latest/models/user";
import { connectDB, isMatch } from "@latest/utils/features";
import { NextResponse } from "next/server";
import { generateToken, cookieSetter } from "@latest/utils/features";

export const POST = asyncError(async (req) => {
  const { email, password } = await req.json();
  if (!email || !password) {
    return errorHandler(NextResponse, 400, "Please enter all fields.");
  }
  await connectDB();
  let user = await User.findOne({ email }).select("+password");
  if (!user)
    return errorHandler(NextResponse, 401, "Incorrect email or password");

  const match = await isMatch(password, user.password);

  if (!match)
    return errorHandler(NextResponse, 401, "Incorrect email or password");

  cookieSetter(NextResponse, generateToken(user._id), true);

  return NextResponse.json(
    {
      success: true,
      message: `Welcome back ${user.name}`,
      user,
    },
    {
      status: 200,
    }
  );
});
