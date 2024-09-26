import BadgeCustom from '@/components/badge-custom';
import ProductItem from '@/components/ui/product-item';
import { computeProductTotalPrice } from '@/helpers/product';
import { prismaClient } from '@/lib/prisma';
import { Percent } from 'lucide-react';

export default async function DealsPage() {
	const deals = await prismaClient.product.findMany({
		where: {
			discountPercentage: {
				gt: 0,
			},
		},
	});

	return (
		<div className="container mx-auto py-4 px-4 space-y-12">
			<BadgeCustom text="Ofertas" icon={<Percent size={18} />} />

			<div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pb-4">
				{deals.map((deal) => (
					<ProductItem key={deal.id} product={computeProductTotalPrice(deal)} />
				))}
			</div>
		</div>
	);
}
