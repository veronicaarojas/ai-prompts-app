//within this file, we set up our providers, 
//such as google authentifcation. 

import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database';

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  async session({ session }) {

  },
  async signIn({ profile }) {
    try {
      await connectToDB();

      //CHECK IF THE USER ALREADY EXISTS

      //IF NOT, CREATE A NEW USER AND SAVE TO DATABASE
      return true;
    } catch(error) {
      console.log(error);
      return false;
    }

  }
})

export { handler as GET, handler as POST};
