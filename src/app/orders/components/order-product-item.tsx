import { computeProductTotalPrice } from '@/helpers/product';
import { Prisma } from '@prisma/client';
import Image from 'next/image';

interface OrderProductItemProps {
	orderProduct: Prisma.OrderProductGetPayload<{
		include: {
			product: true;
		};
	}>;
}

export default function OrderProductItem({
	orderProduct,
}: OrderProductItemProps) {
	const product = computeProductTotalPrice(orderProduct.product);

	return (
		<div className="flex gap-4">
			<div className="bg-accent rounded-lg w-[77px] h-[77px] flex items-center justify-center">
				<Image
					src={orderProduct.product.imageUrls[0]}
					alt={orderProduct.product.name}
					width={0}
					height={0}
					sizes="100vw"
					className="h-auto w-full max-w-[80%] max-h-[70%] object-contain"
				/>
			</div>
			<div>
				<div className="bg-accent px-2 py-1 rounded-sm">
					<p className="text-xs">
						Vendido e entregue por: <span className="font-black">NexBuy</span>
					</p>
				</div>
				<div className="flex flex-col space-y-1 mt-2">
					<p>{orderProduct.product.name}</p>
					<div className="flex gap-2 flex-1">
						<p className="font-bold">
							R$ {(orderProduct.quantity * product.totalPrice).toFixed(2)}
						</p>
						{product.discountPercentage > 0 && (
							<p className="text-zinc-400 line-through">
								R${' '}
								{(orderProduct.quantity * Number(product.basePrice)).toFixed(2)}
							</p>
						)}
						<p className="text-zinc-300">Qtd: {orderProduct.quantity}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
