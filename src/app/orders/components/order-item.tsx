import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import OrderProductItem from './order-product-item';

interface OrderItemProps {
	order: Prisma.OrderGetPayload<{
		include: {
			orderProducts: {
				include: {
					product: true;
				};
			};
		};
	}>;
}

export default function OrderItem({ order }: OrderItemProps) {
	return (
		<Card>
			<Accordion type="single" collapsible className="w-full px-5">
				<AccordionItem value={order.id}>
					<AccordionTrigger>
						<p className="uppercase font-bold">
							Pedido com {order.orderProducts.length} produto(s)
						</p>
					</AccordionTrigger>

					<AccordionContent className="my-2">
						<div className="flex items-center gap-2 justify-between my-4">
							<div className="flex flex-col gap-1">
								<h2 className="uppercase font-bold">Status</h2>
								<p className="text-violet-400 font-bold">
									{order.status === 'PAYMENT_CONFIRMED' && 'Pago'}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<h2 className="uppercase font-bold">Data</h2>
								<p className="text-zinc-400 text-sm">
									{format(order.createdAt, 'dd/MM/yy')}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<h2 className="uppercase font-bold">Pagamento</h2>
								<p className="text-zinc-400 text-sm">Cartão</p>
							</div>
						</div>

						<Separator />

						<div className="flex flex-col space-y-4 my-8">
							{order.orderProducts.map((orderProduct) => (
								<OrderProductItem
									key={orderProduct.id}
									orderProduct={orderProduct}
								/>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</Card>
	);
}
