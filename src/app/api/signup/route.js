import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { firstname, lastname, email, password,role,roll } = await req.json();

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        firstName:firstname,
        lastName:lastname,
        email,
        password: hashedPassword,
        role:role // Store hashed password
      },
    });

    console.log(role);
    if(role=='Student'){
        const newStudent=await prisma.student.create({
            data:{
                email,
                roll:roll,
            }
        })
    }

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating user" +error}, { status: 500 });
  }
}
