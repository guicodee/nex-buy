import { useToast } from '@/hooks/use-toast';
import { CartContext, CartProduct } from '@/providers/cart-provider';
import { ArrowLeft, ArrowRight, Trash } from 'lucide-react';
import Image from 'next/image';
import { useContext } from 'react';
import { Button } from './ui/button';

interface CartItem {
	product: CartProduct;
}

export default function CartItem({ product }: CartItem) {
	const {
		decreaseProductQuantity,
		increaseProductQuantity,
		removeProductToCart,
	} = useContext(CartContext);

	const { toast } = useToast();

	function handleIncreaseProductQuantity() {
		increaseProductQuantity(product.id);
	}

	function handleDecreaseProductQuantity() {
		decreaseProductQuantity(product.id);
	}

	function handleRemoveProductToCart() {
		removeProductToCart(product.id);
		toast({
			title: 'Produto removido.',
			description: 'O produto foi removido do carrinho.',
			duration: 2500,
			variant: 'destructive',
		});
	}

	return (
		<div className="flex items-center">
			<div className="bg-accent rounded-lg h-[80px] w-[80px] flex items-center justify-center">
				<Image
					src={product.imageUrls[0]}
					alt={product.name}
					width={0}
					height={0}
					sizes="100vw"
					className="h-auto w-full max-w-[70%] max-h-[80%] object-contain"
				/>
			</div>
			<div className="flex pl-2 flex-col flex-1">
				<p className="text-xs truncate w-fit max-sm:max-w-[110px] lg:text-sm">
					{product.name}
				</p>
				{product.discountPercentage > 0 ? (
					<div>
						<span className="text-xs font-bold lg:text-sm">
							R$ {product.totalPrice.toFixed(2)}
						</span>
						<span className="text-zinc-400 text-[10px] line-through ml-2 lg:text-xs">
							R$ {Number(product.basePrice).toFixed(2)}
						</span>
					</div>
				) : (
					<p className="text-zinc-200 text-sm font-black">
						R$ {Number(product.basePrice).toFixed(2)}
					</p>
				)}

				<div className="flex items-center gap-2 mt-1">
					<Button
						variant={'outline'}
						size={'icon'}
						className="h-8 w-8"
						onClick={handleDecreaseProductQuantity}
						disabled={product.quantity <= 1}
					>
						<ArrowLeft size={16} />
					</Button>

					<span className="text-sm">{product.quantity}</span>

					<Button
						variant={'outline'}
						size={'icon'}
						className="h-8 w-8"
						onClick={handleIncreaseProductQuantity}
						disabled={product.quantity >= 10}
					>
						<ArrowRight size={16} />
					</Button>
				</div>
			</div>
			<Button
				size={'icon'}
				variant={'outline'}
				onClick={handleRemoveProductToCart}
			>
				<Trash size={16} />
			</Button>
		</div>
	);
}
