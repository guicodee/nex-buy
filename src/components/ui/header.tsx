'use client';

import { ShoppingBag } from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import SheetCart from '../sheet-cart';
import SheetMobile from '../sheet-mobile';
import SheetUser from '../sheet-user';
import { Card } from './card';
import { Separator } from './separator';

export default function Header() {
	async function handleSignIn() {
		await signIn('google');
	}

	async function handleSignOut() {
		await signOut();
	}

	return (
		<>
			<Card className="px-20 py-8 flex justify-between items-center max-md:hidden">
				<Link href={'/'} className="flex items-center gap-3">
					<ShoppingBag size={28} />
					<p className="text-zinc-200 font-black uppercase text-xl tracking-">
						NexBuy
					</p>
				</Link>

				<div className="flex items-center gap-4 h-5">
					<Link href={'/'} className="hover:underline hover:text-zinc-300">
						Início
					</Link>
					<Separator orientation="vertical" />
					<Link
						href={'/catalog'}
						className="hover:underline hover:text-zinc-300"
					>
						Catálogo
					</Link>
					<Separator orientation="vertical" />
					<Link href={'/'} className="hover:underline hover:text-zinc-300">
						Ofertas
					</Link>
				</div>

				<div className="flex items-center gap-7">
					<SheetUser
						handleSignIn={handleSignIn}
						handleSignOut={handleSignOut}
					/>

					<SheetCart />
				</div>
			</Card>

			<Card className="px-7 py-4 flex justify-between items-center md:hidden">
				<SheetMobile
					handleSignIn={handleSignIn}
					handleSignOut={handleSignOut}
				/>

				<Link href={'/'} className="flex items-center gap-2">
					<ShoppingBag size={24} />
					<p className="text-zinc-200 font-black uppercase tracking-wider">
						NexBuy
					</p>
				</Link>

				<SheetCart />
			</Card>
		</>
	);
}
