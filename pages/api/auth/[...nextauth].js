import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import TwitterProvider from 'next-auth/providers/twitter';
import RedditProvider from "next-auth/providers/reddit";
import GitHubProvider from 'next-auth/providers/github';


// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import { clientPromise } from "../../../lib/mongodb";

const options = {
  //Configure JWT
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET, 
    }),

    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
    })
  ],
  pages: {
    signIn: "/signin",
  }
  // adapter: MongoDBAdapter({
  //   db: (await clientPromise).db("users")
  // }),
}

export default (req, res) => NextAuth(req, res, options);