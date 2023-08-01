import { asyncError, errorHandler } from "@latest/middlewares/error";
import { User } from "@latest/models/user";
import { connectDB, cookieSetter, generateToken } from "@latest/utils/features";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = asyncError(async (req) => {
  const { name, email, password } = await req.json();
  if (!name || !email || !password)
    return errorHandler(NextResponse, 400, "Please enter all fields");

  await connectDB();
  let user = await User.findOne({ email });
  if (user)
    return errorHandler(
      NextResponse,
      409,
      "User already exist with this email address"
    );

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  cookieSetter(NextResponse, generateToken(user._id), true);

  return NextResponse.json(
    {
      success: true,
      message: "Registered successfully",
      user,
    },
    { status: 201 }
  );
});
