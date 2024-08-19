'use server';

import connectDB from "@/config/db";
import User from "@/models/user";
import axios from "axios";
import { sendEmail, emailVerificationTemplate, passwordResetTemplate } from "@/utils/mail";
import { v4 as uuidv4 } from 'uuid';
import Token from "@/models/token";
import bcrypt from 'bcryptjs';


const registerUser = async (formData) => {
    await connectDB();

    if (!formData.captcha) {
        throw new Error("Captcha verification failed");
    } else if (!formData.email || !formData.password || !formData.confirmPassword || !formData.fullName || !formData.mobile) {
        throw new Error("All fields are required");
    } else if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
    }

    try {
        const captcha = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SERVER_CAPTCHA}&response=${formData.captcha}`
        );
        if (!captcha.data.success) {
            throw new Error("Captcha verification failed");
        }

        // Check if user already exists
        const user = await User.findOne({ 'local.email': formData.email });
        const googleUser = await User.findOne({ 'google.email': formData.email });

        if (googleUser && !user) {
            googleUser.local = {
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                mobile: formData.mobile,
            };
            googleUser.isVerified = true;
            await googleUser.save();
            
            return { success: true, message: 'Registration successful' };
        }

        if (user) {
            throw new Error("Email already exists");
        }

        // Create a new user
        const newUser = new User({
            local: {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                mobile: formData.mobile,
            }
        });

        await newUser.save();
        const token = await  new Token({
            userId:newUser._id,
            token: uuidv4()
        }).save()
        // Construct the verification URL
      const link = `${process.env.NEXT_PUBLIC_API_URL}/${newUser.id}/verify/${token.token}`;
      const htmlContent = emailVerificationTemplate(link, newUser);

      // Send the verification email
      await sendEmail(newUser.local.email, 'Account verification',htmlContent);
      console.log('Verification email sent');
        return { success: true, message: 'Account created successfully. Check your email to verify your account' };

    } catch (err) {
        throw new Error(err.message || "An error occurred during registration");
    }
};

//forgot password
const forgotPassword = async (email) => {
    await connectDB();
    try{
        //check if user exists
        const user = await User.findOne({ 'local.email': email });
        if(!user){
            throw new Error("User not found");
        }
        
        //check if user is verified
        if(user.isVerified === false){
            console.log('User is not verified');
            const tokenUser = await Token.findOne({userId: user._id});
            if(tokenUser){
                throw new Error("User is not verified.Check your email for verification link");
            }
            // Create a new email token for the user if they are not verified
            const token = await new Token({
                userId: user._id,
                token: uuidv4()
            }).save()
            const link = `${process.env.NEXT_PUBLIC_API_URL}/${user.id}/verify/${token.token}`;
            const htmlContent = emailVerificationTemplate(link, user);
      
            // Send the verification email
            await sendEmail(user.local.email, 'Account verification',htmlContent);
            console.log('Verification email sent');
            throw new Error("User is not verified.Check your email for verification link");
        }

        //check if there is an existing password token for the user
        const tokenUser = await Token.findOne({userId: user._id});
        if(tokenUser){
            throw new Error("Check your email for password reset link");
        }

        // Create a new token for the user
        const token = await  new Token({
            userId: user._id,
            token: uuidv4()
        }).save()
        // construct the reset password link
        const link = `${process.env.NEXT_PUBLIC_API_URL}/resetpassword/${user.id}/${token.token}`;
        const htmlContent = passwordResetTemplate(link, user);


        // Send the password reset email
        await sendEmail(user.local.email, 'Password Reset',htmlContent);
        console.log('Password reset email sent');
        return { success: true, message: 'Password reset email sent. Check your email for password reset link' };

    }catch(err){
        console.log(err.message);
        throw new Error(err.message || "An error occurred during password reset");
    }
}

//reset password
const resetPassword = async (confirmPassword, userId, password) => {
    await connectDB();
    try{
        const user = await User.findById(userId);
        if(!user){
            throw new Error("User not found");
        }
        if(confirmPassword!== password){
            throw new Error("Password does not match");
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.local.password = hashedPassword;
        await user.save();
        return { success: true, message: 'Password reset successfully' };

    }catch(err){
        throw new Error(err.message || "An error occurred during password reset");
    }
}

export  {registerUser, forgotPassword, resetPassword};
