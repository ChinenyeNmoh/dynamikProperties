'use client';
import { SessionProvider } from 'next-auth/react';

//we want to wrap our entire layout with the session provider
//but because we dont want our layout to be a client side rendered component
//we will create a new component called AuthProvider
//and wrap our layout with the session provider
const AuthProvider = ({ children }) => {
  
  return <SessionProvider>{children}</SessionProvider>;
};
export default AuthProvider;