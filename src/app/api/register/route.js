// pages/api/register.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, image } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json({ message: 'User already exists!' }, { status: 400 });
    }

    const newUser = await User.create({ name, email, image, password: hashedPassword });

    return NextResponse.json({ message: 'User registered successfully!' }, { status: 201 });
  } catch (error) {
    console.error("Error while registering user:", error);
    return NextResponse.json({ message: 'An error occurred while registering the user.' }, { status: 500 });
  }
}
