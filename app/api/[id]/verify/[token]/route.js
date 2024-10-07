import connectDB from "@/config/db";
import User from "@/models/user";
import Token from "@/models/token";
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  const { id: userId, token } = params;
  await connectDB();

  try {
    const user = await User.findById(userId);
    if (!user) {
      const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/login/?error=${encodeURIComponent('User not found')}`;
      return NextResponse.redirect(redirectUrl);
    }

    const emailToken = await Token.findOne({ userId, token,type: 'verification' });
    if (!emailToken) {
      const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/login/?error=${encodeURIComponent('Invalid or expired token. Verify email again')}`;
      return NextResponse.redirect(redirectUrl);
    }

    user.isVerified = true;
    await user.save();
    await emailToken.deleteOne();
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/login/?message=${encodeURIComponent('Email verified. Login to continue')}`;

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
