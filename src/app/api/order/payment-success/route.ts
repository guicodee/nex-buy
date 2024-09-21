import { prismaClient } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2024-06-20',
});
export async function POST(request: Request) {
	const signature = request.headers.get('stripe-signature');

	if (!signature) {
		return NextResponse.error();
	}

	const text = await request.text();

	try {
		const event = stripe.webhooks.constructEvent(
			text,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET_KEY!
		);

		if (event.type === 'checkout.session.completed') {
			const session = event.data.object as Stripe.Checkout.Session;

			await prismaClient.order.update({
				where: {
					id: session?.metadata?.orderId,
				},
				data: {
					status: 'PAYMENT_CONFIRMED',
				},
			});
		}

		return NextResponse.json({ received: true });
	} catch (error) {
		console.error('Webhook error:', error);
		return NextResponse.error();
	}
}
