'use client';

import DiscountBadge from '@/components/discount-badge';
import { Button } from '@/components/ui/button';
import { ProductWithTotalPrice } from '@/helpers/product';
import { useToast } from '@/hooks/use-toast';
import { CartContext } from '@/providers/cart-provider';
import { ArrowLeft, ArrowRight, TruckIcon } from 'lucide-react';
import { useContext, useState } from 'react';

interface ProductInfoProps {
	products: ProductWithTotalPrice;
}

export default function ProductInfo({ products }: ProductInfoProps) {
	const [quantity, setQuantity] = useState(1);
	const { addProdcutsToCart } = useContext(CartContext);
	const { toast } = useToast();

	function handleIncreaseProductQuantity() {
		setQuantity((prev) => prev + 1);
	}

	function handleDecreaseProductQuantity() {
		setQuantity((prev) => prev - 1);
	}

	function handleAddProductToCart() {
		addProdcutsToCart({ ...products, quantity });
		toast({
			title: 'Produto adicionado!',
			description: 'O Produto foi adicionado com sucesso ao carrinho.',
			variant: 'success',
			duration: 2500,
		});
	}

	return (
		<div className="lg:bg-zinc-900 max-lg:px-4 lg:px-8 max-lg:py-4 lg:py-8 rounded-lg flex flex-col gap-8">
			<div>
				<h1 className="text-2xl leading-8">{products?.name}</h1>
				<span className="text-sm text-violet-400">Disponível em estoque</span>
			</div>
			<div>
				{products?.discountPercentage > 0 ? (
					<div className="flex flex-col">
						<div className="text-zinc-200 text-2xl max-sm:text-xl font-black flex gap-3">
							R$ {products?.totalPrice.toFixed(2)}
							<DiscountBadge className="max-sm:text-xs">
								{products.discountPercentage}
							</DiscountBadge>
						</div>

						<p className="text-zinc-400 text-sm max-sm:text-xs tracking-wide">
							De:
							<span className="line-through ml-2">
								R$ {Number(products?.basePrice).toFixed(2)}
							</span>
						</p>
					</div>
				) : (
					<p className="text-zinc-200 text-sm font-black">
						R$ {Number(products?.basePrice)}
					</p>
				)}

				<div className="flex gap-4 items-center mt-4">
					<Button
						variant={'outline'}
						size={'icon'}
						onClick={handleDecreaseProductQuantity}
					>
						<ArrowLeft size={16} />
					</Button>

					<span className="max-sm:text-sm">{quantity}</span>

					<Button
						variant={'outline'}
						size={'icon'}
						onClick={handleIncreaseProductQuantity}
					>
						<ArrowRight size={16} />
					</Button>
				</div>

				<div className="mt-8">
					<h2 className="font-bold mb-2">Descrição</h2>
					<span className="text-sm text-zinc-400 tracking-wider h-[181px] line-clamp-2">
						{products.description}
					</span>
				</div>

				<div className="flex flex-col gap-4 mt-8">
					<Button
						variant={'ghost'}
						className="bg-violet-700 text-zinc-200 uppercase w-full hover:bg-violet-800"
						onClick={handleAddProductToCart}
					>
						Adicionar ao carrinho
					</Button>
					<div className="bg-zinc-800 w-full flex gap-4 items-center px-4 py-4 rounded-lg">
						<div className="text-sm flex-1 items-center flex gap-4">
							<TruckIcon size={28} />
							<div>
								<p className="max-sm:text-xs">
									Entrega via <span className="font-bold">NexBuy</span>
								</p>
								<p className="text-violet-400 max-sm:text-xs">
									Envio para <span className="font-bold">todo o Brasil</span>
								</p>
							</div>
						</div>
						<p className="font-bold text-sm">Frete grátis</p>
					</div>
				</div>
			</div>
		</div>
	);
}
