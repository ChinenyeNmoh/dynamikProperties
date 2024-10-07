import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import getJwtToken from './utils/getToken';

// Middleware function
export async function middleware(request) {
  console.log('Middleware request initiated.');

  try {

     // Check for JWT token in cookies
    const tokenJwt = request.cookies.get('jwtPropertyToken')?.value;

    // Retrieve token from NextAuth JWT (cookie or Authorization header)
    const tokenNextAuth = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    // Validate user either via session or token
    const userFromToken = await getJwtToken(tokenJwt);

    if (tokenNextAuth || userFromToken) {
      return NextResponse.next();
    } else {
      // No token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    console.error('Error in middleware authentication:', error.message);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Define the routes the middleware applies to
export const config = {
  matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
};
