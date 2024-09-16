import ProductList from '@/components/ui/product-list';
import { computeProductTotalPrice } from '@/helpers/product';
import { prismaClient } from '@/lib/prisma';
import ProductImages from './components/product-images';
import ProductInfo from './components/product-info';

interface ProductProps {
	params: {
		slug: string;
	};
}

export default async function Product({ params: { slug } }: ProductProps) {
	const products = await prismaClient.product.findFirst({
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

	if (!products) return null;

	return (
		<div>
			<div className="grid grid-cols-2 gap-2 lg:px-12 lg:py-4 mx-auto max-lg:flex max-lg:flex-col">
				<ProductImages imagesUrls={products.imageUrls} name={products.id} />
				<ProductInfo
					products={computeProductTotalPrice(products)}
					key={products?.id}
				/>
			</div>

			<div className="px-4 space-y-4 my-8 lg:px-12 ">
				<h1 className="font-bold text-lg uppercase">Produtos recomendados</h1>
				<ProductList products={products.category.products} />
			</div>
		</div>
	);
}
