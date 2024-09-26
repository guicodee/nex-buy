import BadgeCustom from '@/components/badge-custom';
import { authOptions } from '@/lib/auth';
import { prismaClient } from '@/lib/prisma';
import { ShoppingBasket } from 'lucide-react';
import { getServerSession } from 'next-auth';
import AccessDenied from './components/access-denied';
import OrderItem from './components/order-item';

export default async function Orders() {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) return <AccessDenied />;

	const orders = await prismaClient.order.findMany({
		where: {
			userId: session.user.id,
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
			<BadgeCustom text="Meus pedidos" icon={<ShoppingBasket size={18} />} />

			<div className="space-y-6">
				{orders.map((order) => (
					<OrderItem key={order.id} order={order} />
				))}
			</div>
		</div>
	);
}
