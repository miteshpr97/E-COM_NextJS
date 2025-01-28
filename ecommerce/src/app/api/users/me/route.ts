/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


// Connect to the database
connect();

export async function GET(request: NextRequest) {
  try {
 
  } catch (error: any) {
    return NextResponse.json(
      { error: "An error occurred during registration. Please try again." },
      { status: 500 }
    );
  }
}

