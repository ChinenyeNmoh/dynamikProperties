import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  try {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    const cookieStore = cookies();

    // Set the cookie with the token
    cookieStore.set({
      name: "jwtPropertyToken",    
      value: token,          
      path: '/',                 
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',             
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  
    });

  } catch (error) {
    console.error("Error generating token or setting cookie:", error.message);
    throw new Error("Token generation or cookie setting failed");
  }
};

export default generateToken;
