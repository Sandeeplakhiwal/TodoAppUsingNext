import { asyncError } from "@latest/middlewares/error";
import { cookieSetter, generateToken } from "@latest/utils/features";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncError(async (req) => {
  cookieSetter(NextResponse, null, false);
  return NextResponse.json(
    {
      success: true,
      message: `Logged out successfully`,
    },
    {
      status: 200,
    }
  );
});
