import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './ui/sheet';

export default function SheetCart() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={'outline'} size={'icon'}>
					<ShoppingCart size={16} />
				</Button>
			</SheetTrigger>

			<SheetContent side={'right'}>
				<SheetHeader>
					<SheetTitle>Carrinho</SheetTitle>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
