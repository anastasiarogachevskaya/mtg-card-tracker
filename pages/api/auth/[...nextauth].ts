import NextAuth, { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import GitHubProvider from 'next-auth/providers/github';
import clientPromise from '../../../lib/mongodb';

export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
	],
	pages: {
		signIn: '/signin',
	},
};

export default NextAuth(authOptions);
