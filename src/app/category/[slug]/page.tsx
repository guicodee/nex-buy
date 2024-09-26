import BadgeCustom from '@/components/badge-custom';
import ProductItem from '@/components/ui/product-item';
import { CATEGORY_ICON } from '@/constants/category-icon';
import { computeProductTotalPrice } from '@/helpers/product';
import { prismaClient } from '@/lib/prisma';

interface CategoryProductsProps {
	params: {
		slug: string;
	};
}

export default async function CategoryProducts({
	params: { slug },
}: CategoryProductsProps) {
	const category = await prismaClient.category.findFirst({
		where: {
			slug,
		},
		include: {
			products: true,
		},
	});

	if (!category) return;

	return (
		<div className="container mx-auto py-4 px-4 space-y-8">
			<BadgeCustom
				text={category.name}
				icon={CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
			/>

			<div className="flex items-center gap-5 max-lg:grid max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-5">
				{category.products.map((product) => (
					<ProductItem
						key={product.id}
						product={computeProductTotalPrice(product)}
					/>
				))}
			</div>
		</div>
	);
}
