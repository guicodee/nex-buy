import {
	computeProductTotalPrice,
	ProductWithTotalPrice,
} from '@/helpers/product';
import { prismaClient } from '@/lib/prisma';
import Image from 'next/image';
import ProductInfo from './components/product-info';

interface ProductProps {
	params: {
		slug: string;
	};
}

export default async function Product({ params: { slug } }: ProductProps) {
	const products: ProductWithTotalPrice = await prismaClient.product.findFirst({
		where: {
			slug,
		},
		include: {
			category: {
				include: {
					products: {
						where: {
							slug: {
								not: slug,
							},
						},
					},
				},
			},
		},
	});

	console.log(products);

	return (
		<div className="grid grid-cols-2 gap-8 px-12 py-4 mx-auto">
			<div className="bg-zinc-900 flex items-center justify-center w-full h-[670px] rounded-lg">
				<Image
					src={products?.imageUrls[0] as string}
					alt="djsajdsap"
					width={0}
					height={0}
					sizes="100vw"
					className="w-full h-auto max-w-[70%] max-h-[80%]"
				/>
			</div>

			<ProductInfo
				products={computeProductTotalPrice(products)}
				key={products.id}
			/>
		</div>
	);
}
