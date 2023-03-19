import { UserProps } from '../types/Session';
import { connectDatabase } from './mongoDB-util';

async function updateUserProfile(
	email: string,
	updates: Partial<UserProps>
): Promise<void> {
	let client;
	try {
		client = await connectDatabase();
		const db = client.db('magic');
		const usersCollection = db.collection('users');
		await usersCollection.updateOne({ email }, { $set: updates });
	} catch (error) {
		console.error(error);
	}
}

export { updateUserProfile };
