import NextAuth, { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import GitHubProvider from 'next-auth/providers/github';
import clientPromise from '../../../lib/mongodb';
import { connectDatabase } from '../../../utils/mongoDB-util';

export const authOptions: NextAuthOptions = {
	// adapter: MongoDBAdapter(clientPromise),
	adapter: MongoDBAdapter(clientPromise, {
		databaseName: 'magic',
	}),
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
	],
	session: {
		maxAge: 30 * 24 * 60 * 60, // How long until an idle session expires in seconds. (30 days)
		updateAge: 24 * 60 * 60, // How often to regenerate a new session ID in seconds. (24 hours)
	},
	pages: {
		signIn: '/signin',
	},
};

export default NextAuth(authOptions);
