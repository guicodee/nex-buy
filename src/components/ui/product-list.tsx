import { computeProductTotalPrice } from '@/helpers/product';
import { Product } from '@prisma/client';
import ProductItem from './product-item';

interface ProductListProps {
	products: Product[];
	category?: string;
}

export default function ProductList({ products, category }: ProductListProps) {
	return (
		<div className="flex flex-col w-full gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
			{category && (
				<div className="flex items-center gap-2 px-4">
					<h1 className="font-black text-lg uppercase">{category}</h1>
				</div>
			)}

			<div className="flex items-center gap-4">
				{products.map((product) => (
					<ProductItem
						key={product.id}
						product={computeProductTotalPrice(product)}
					/>
				))}
			</div>
		</div>
	);
}
