import { Badge } from '@/components/ui/badge';
import { authOptions } from '@/lib/auth';
import { prismaClient } from '@/lib/prisma';
import { ShoppingBasket } from 'lucide-react';
import { getServerSession } from 'next-auth';
import OrderItem from './components/order-item';

export default async function Orders() {
	const user = await getServerSession(authOptions);

	if (!user?.user) return <h1>Acesso negado</h1>;

	const orders = await prismaClient.order.findMany({
		where: {
			userId: user.user.id,
			status: 'PAYMENT_CONFIRMED',
		},
		include: {
			orderProducts: {
				include: {
					product: true,
				},
			},
		},
	});

	return (
		<div className="container mx-auto py-4 px-4 space-y-12">
			<Badge
				variant={'outline'}
				className="px-4 py-2 flex items-center gap-3 w-fit uppercase font-bold text-base border-violet-400"
			>
				<ShoppingBasket size={18} />
				Meus pedidos
			</Badge>

			<div className="space-y-6">
				{orders.map((order) => (
					<OrderItem key={order.id} order={order} />
				))}
			</div>
		</div>
	);
}
