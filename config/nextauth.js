import connectDB from '@/config/db';
import User from '@/models/user';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        // 1. Connect to the database
        await connectDB();
        
        // 2. Check if user exists
        const localExists = await User.findOne({ 'local.email': profile.email });
        const googleExists = await User.findOne({ 'google.email': profile.email });
        
        if (localExists && googleExists) {
          return true;  // login successful
        } else if (localExists) {
          // Add Google profile to existing local user
          localExists.google = {
            fullName: profile.name,
            email: profile.email,
            
            image: profile.picture,
          };
          localExists.isVerified = true;  // Mark the user as verified
          console.log('Updated localExists before save:', localExists);
          await localExists.save();
          console.log('Updated localExists after save:', localExists);
          return true;  // login successful
        } else if (googleExists) {
          return true;  // login successful
        } else {
          const newUser = new User({
            google: {
              fullName: profile.name,
              email: profile.email,
              image: profile.picture,
            },
            isVerified: true,  // User is verified by Google
          });
          await newUser.save();
          return true;  // Google user registered
        }
      } catch (error) {
        console.error('Error during signIn callback:', error);
        return false;  // Return false to deny the sign-in
      }
    },
    // Modifies the session object
    async session({ session }) {
      try {
        // 1. Get the user from the database
        const user = await User.findOne({ 'google.email ': session.user.email });
        if (user) {
          // 2. Assign the user id to the session
          session.user._id = user._id.toString();
          // 3. Add additional user information to the session
          session.user.name = user.google.fullName || user.local.fullName;
          session.user.email = user.google.email || user.local.email;
          session.user.isAdmin = user.isAdmin;
          session.user.bookmarks = user.bookmarks;
        }
        return session;
      } catch (error) {
        console.error('Error during session callback:', error);
        return session; 
      }
    },
  },
};
