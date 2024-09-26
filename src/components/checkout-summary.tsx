import { Separator } from './ui/separator';

interface CheckoutSummaryProps {
	subtotal: number;
	totalDiscount: number;
	total: number;
}

export default function CheckoutSummary({
	subtotal,
	total,
	totalDiscount,
}: CheckoutSummaryProps) {
	return (
		<>
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
		</>
	);
}
