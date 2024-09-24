'use client';

import CustomButton from '@/components/custom-button';
import { LogIn, ShieldAlert } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function AccessDenied() {
	async function handleSignIn() {
		await signIn('google');
	}

	return (
		<div className="flex flex-col justify-center items-center space-y-4 container m-auto h-full">
			<ShieldAlert size={64} color="#F00" />
			<h1>Acesso negado!</h1>
			<div>
				<p className="text-center max-sm:max-w-64">
					Você não tem permissão para acessar está página. Faça seu login.
				</p>
			</div>
			<CustomButton
				onClick={() => handleSignIn()}
				text="Login"
				icon={<LogIn size={18} />}
				variant={'outline'}
				className="w-fit gap-2"
			/>
		</div>
	);
}
