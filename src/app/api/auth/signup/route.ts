import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sanitizeObject } from "@/lib/validation";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const sanitizedBody = sanitizeObject(rawBody);
    const { name, email, password } = sanitizedBody;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Use transaction to ensure user and token are created together
    const user = await prisma.$transaction(async (tx) => {
      // Create user
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      // Create verification token
      await tx.verificationToken.create({
        data: {
          identifier: email,
          token,
          expires,
          userId: newUser.id,
        },
      });

      return newUser;
    });

    // Send verification email
    try {
      await sendVerificationEmail(email, token);
    } catch (emailError) {
      logger.error("Failed to send verification email", emailError as Error, { email });
      // Don't fail the signup if email fails
    }

    return NextResponse.json({ 
      user, 
      message: "Account created successfully. Please check your email to verify your account." 
    }, { status: 201 });
  } catch (error) {
    logger.error("Failed to create user account", error as Error, { endpoint: "POST /api/auth/signup" });
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}


