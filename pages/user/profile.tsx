import { useSession } from 'next-auth/react';
import Profile from '../../components/User/Profile';

export default function Admin() {
	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated() {
			// The user is not authenticated, handle it here.
		},
	});

	if (status === 'loading') {
		return 'Loading or not authenticated...';
	}
	type Optional<T> = {
		[P in keyof T]?: T[P];
	};

	return session?.user ? (
		<Profile
			user={
				(session?.user as Optional<{
					name: string;
					email: string;
					image: string;
				}>) || {}
			}
		/>
	) : (
		<p>Please log in to view this page.</p>
	);
}
