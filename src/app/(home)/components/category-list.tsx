import { Button } from '@/components/ui/button';
import { CATEGORY_ICON } from '@/constants/category-icon';
import { prismaClient } from '@/lib/prisma';
import Link from 'next/link';

export default async function CategoryList() {
	const categories = await prismaClient.category.findMany({});

	return (
		<div className="flex items-center justify-center gap-6 max-lg:grid max-lg:grid-cols-2">
			{categories.map((category) => (
				<Link href={`/category/${category.slug}`}>
					<Button key={category.id} variant={'outline'} className="w-full">
						<div className="flex items-center px-4 gap-2">
							{CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
							<span>{category.name}</span>
						</div>
					</Button>
				</Link>
			))}
		</div>
	);
}
