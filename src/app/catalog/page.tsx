import BadgeCustom from '@/components/badge-custom';
import { prismaClient } from '@/lib/prisma';
import { Grid2X2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Catalog() {
	const categories = await prismaClient.category.findMany({});

	return (
		<div className="container mx-auto py-4 px-4 space-y-8">
			<BadgeCustom text="Catálogo" icon={<Grid2X2 size={20} />} />

			<div className="grid max-lg:grid-cols-2 max-md:grid-cols-1 lg:grid-cols-3 gap-8">
				{categories.map((category) => (
					<Link href={`/category/${category.slug}`} key={category.id}>
						<div className="flex flex-col">
							<div className="flex h-[150px] w-full items-center justify-center rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-violet-800 to-violet-950">
								<Image
									src={category.imageUrl}
									alt={category.name}
									width={0}
									height={0}
									sizes="100vw"
									className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
								/>
							</div>

							<div className="rounded-bl-lg rounded-br-lg bg-accent py-3">
								<p className="text-center text-sm font-semibold">
									{category.name}
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
