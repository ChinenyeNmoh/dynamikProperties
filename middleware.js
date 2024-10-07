import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/config/nextauth';
import { jwtVerify } from 'jose';

// Middleware function
export async function middleware(request) {
  try {

    const cookieStore = cookies();
    const token = cookieStore.get('jwtPropertyToken')
    console.log("Token from cookies:", token);
    // Get session from NextAuth
    const session = await getServerSession(authOptions, request);

    console.log("Session:", session);
    console.log("Token from cookies:", token);

    // Check if token is available
    if (token) {
      try {
        // Verify the token
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        const user = payload?.user;

        // If valid user exists, continue the request
        if (user) {
          return NextResponse.next();
        }
      } catch (error) {
        console.error("JWT verification error:", error.message);
        return NextResponse.redirect('/login');
      }
    }

    // If token is missing, check session
    if (!session) {
      // No session and no valid token, redirect to login
      return NextResponse.redirect('/login');
    }

    // Continue to the next middleware or requested page
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error.message);
    return NextResponse.redirect('/login');
  }
}

// Define the routes the middleware applies to
export const config = {
  matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
};
