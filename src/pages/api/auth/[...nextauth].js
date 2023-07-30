import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from 'lib/mongodb';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   httpOptions: {
    //     timeout: 50000,
    //   },
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      httpOptions: {
        timeout: 50000,
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  // specify URLs to be used if you want to create a custom sign in, sign out and error pages.
  pages: {
    signIn: '/home',
  },
  // choose how you want to save the user session
  // if you use an 'adapter', they default it to 'database', otherwise, default to 'jwt'
  session: {
    strategy: 'jwt',
  },
  debug: true,
};

export default NextAuth(authOptions);
