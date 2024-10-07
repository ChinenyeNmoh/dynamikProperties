import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/config/nextauth';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const getUser = async () => {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("jwtPropertyToken");
  let user = null;
  const session = await getServerSession(authOptions);
  if (tokenCookie) {
    const token = tokenCookie.value;
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      user = payload?.user;
    } catch (error) {
      console.error("Error verifying token:", error.message);
    }
  }

  if (!user && session && session.user) {
    user = session.user;
  }

  return user;
};

export default getUser;