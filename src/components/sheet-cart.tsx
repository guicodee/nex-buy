import createCheckout from '@/actions/checkout';
import createOrder from '@/actions/order';
import { CartContext } from '@/providers/cart-provider';
import { loadStripe } from '@stripe/stripe-js';
import { ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import CartItem from './cart-item';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './ui/sheet';

export default function SheetCart() {
	const { data } = useSession();
	const { products, subtotal, total, totalDiscount } = useContext(CartContext);

	async function handleFinishBuy() {
		if (!data?.user) return;
		await createOrder(products, (data.user as any).id);

		const checkout = await createCheckout(products);
		const stripe = await loadStripe(
			process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
		);

		stripe?.redirectToCheckout({
			sessionId: checkout.id,
		});
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={'outline'} size={'icon'}>
					<ShoppingCart size={16} />
				</Button>
			</SheetTrigger>

			<SheetContent side={'right'}>
				<div className="h-full flex flex-col gap-4">
					<SheetHeader>
						<SheetTitle className="mb-2">Carrinho</SheetTitle>
					</SheetHeader>

					<ScrollArea className="h-full w-full max-w-full rounded-md">
						<div className="flex flex-col gap-6">
							{products.map((product) => (
								<CartItem product={product} key={product.id} />
							))}
						</div>
					</ScrollArea>

					<div className="flex flex-col gap-3 mt-auto">
						<Separator />
						<div className="flex text-sm text-zinc-200">
							<p className="flex-1">Subtotal</p>
							<p>R$ {subtotal.toFixed(2)}</p>
						</div>

						<Separator />
						<div className="flex text-sm text-zinc-200">
							<p className="flex-1">Entrega</p>
							<p>GRÁTIS</p>
						</div>

						<Separator />
						<div className="flex text-sm text-zinc-200">
							<p className="flex-1">Descontos</p>
							<p>-R$ {totalDiscount.toFixed(2)}</p>
						</div>

						<Separator />
						<div className="flex text-sm font-bold text-zinc-200">
							<p className="flex-1">Total</p>
							<p>R$ {total.toFixed(2)}</p>
						</div>

						<Button
							className="bg-violet-700 text-zinc-200 uppercase hover:bg-violet-800 mt-4"
							onClick={handleFinishBuy}
						>
							Finalizar compra
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
