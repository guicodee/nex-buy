import {
	House,
	ListCollapse,
	LogIn,
	LogOut,
	MenuIcon,
	Percent,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import CustomButton from './custom-button';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './ui/sheet';

interface SheetMobileProps {
	handleSignIn: () => void;
	handleSignOut: () => void;
}

export default function SheetMobile({
	handleSignIn,
	handleSignOut,
}: SheetMobileProps) {
	const { data, status } = useSession();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={'outline'} size={'icon'}>
					<MenuIcon size={16} />
				</Button>
			</SheetTrigger>

			<SheetContent side={'left'}>
				<SheetHeader>
					<SheetTitle className="mb-4">Menu</SheetTitle>
				</SheetHeader>

				{status === 'authenticated' && data.user && (
					<div className="flex items-center gap-2 mb-6">
						<Image
							src={data.user.image!}
							alt={data.user.name!}
							width={40}
							height={40}
							className="rounded-full"
						/>

						<div>
							<span className="text-zinc-200 text-sm">{data.user.name}</span>
							<h1 className="text-zinc-400 text-xs">{data?.user?.email}</h1>
						</div>
					</div>
				)}

				<Separator />

				<div className="mt-4 flex flex-col gap-3">
					{status === 'unauthenticated' ? (
						<CustomButton
							onClick={handleSignIn}
							text="Login"
							icon={<LogIn size={18} />}
							variant={'outline'}
						/>
					) : (
						<CustomButton
							onClick={handleSignOut}
							text="Desconectar"
							icon={<LogOut size={18} />}
							variant={'outline'}
						/>
					)}

					<CustomButton
						text="Início"
						icon={<House size={18} />}
						variant={'outline'}
					/>

					<CustomButton
						text="Ofertas"
						icon={<Percent size={18} />}
						variant={'outline'}
					/>

					<SheetClose asChild>
						<Link href={'/catalog'}>
							<CustomButton
								text="Catálogo"
								icon={<ListCollapse size={18} />}
								variant={'outline'}
							/>
						</Link>
					</SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	);
}
