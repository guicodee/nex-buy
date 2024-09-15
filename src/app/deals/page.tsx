import { Badge } from '@/components/ui/badge';
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
			<Badge
				variant={'outline'}
				className="px-4 py-2 flex items-center gap-3 w-fit uppercase font-bold text-base border-violet-400"
			>
				<Percent size={18} />
				Ofertas
			</Badge>

			<div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pb-4">
				{deals.map((deal) => (
					<ProductItem key={deal.id} product={computeProductTotalPrice(deal)} />
				))}
			</div>
		</div>
	);
}
