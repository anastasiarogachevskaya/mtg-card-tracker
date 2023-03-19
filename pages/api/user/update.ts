import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { UserProps } from '../../../types/Session';
import { updateUserProfile } from '../../../utils/updateUserProfile';

type UpdateProfileRequestBody = {
	currency?: 'USD' | 'EUR';
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	if (req.method !== 'PATCH') {
		res.status(405).end(); // Method Not Allowed
		return;
	}

	const session = await getSession({ req });
	if (!session || !session.user || !session.user.email) {
		res.status(401).end(); // Unauthorized
		return;
	}

	const { currency }: UpdateProfileRequestBody = req.body;

	try {
		const updates: Partial<UserProps> = {};

		if (currency) {
			updates.currency = currency;
		}

		await updateUserProfile(session.user.email, updates);

		res.status(200).json({ success: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to update user profile' });
	}
}
