import { NextResponse } from "next/server";
import User from "@/models/user";
import Token from "@/models/token";
import connectDB from "@/config/db";

export  const GET = async (req, { params }) => {
    const { id: userId, token } = params;
    await connectDB();

    try {
        const user = await User.findById(userId);
        if (!user) {
            const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/login?error=${encodeURIComponent('User not found')}`;
            return NextResponse.redirect(redirectUrl);
        }
    
        const passwordToken = await Token.findOne({ userId, token });
        if (!passwordToken) {
            const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/forgotpassword`;
            const redirectWithMessage = `${redirectUrl}?error=${encodeURIComponent('Invalid or expired token. Reset password again')}`;
            return NextResponse.redirect(redirectWithMessage);
            
        }

        // Delete the token after use
        await passwordToken.deleteOne();

        // Redirect to the reset password page with an error message
            const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/resetpassword/${userId}/?message=${encodeURIComponent('Token verified. Reset your password')}`;
            return NextResponse.redirect(redirectUrl);

    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
