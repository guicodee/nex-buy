import { CartContext } from '@/providers/cart-provider';
import { ShoppingCart } from 'lucide-react';
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
	const { products, subtotal, total, totalDiscount } = useContext(CartContext);

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
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
