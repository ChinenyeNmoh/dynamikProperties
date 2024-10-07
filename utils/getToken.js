import { jwtVerify } from 'jose';

const getJwtToken = async (token) => {
  try {
    // Verify the token using the JWT secret
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    const user = payload?.user;
    return user;
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return null;
  }
};

export default getJwtToken;