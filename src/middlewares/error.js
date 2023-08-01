import { NextResponse } from "next/server";

export const errorHandler = (
  res,
  statusCode = 500,
  message = "Internal server error"
) => {
  return res.json(
    {
      success: false,
      message,
    },
    { status: statusCode }
  );
};

export const asyncError = (passedFunction) => async (req, res) => {
  return Promise.resolve(passedFunction(req, res)).catch((error) => {
    return errorHandler(NextResponse, 500, error.message);
  });
};
