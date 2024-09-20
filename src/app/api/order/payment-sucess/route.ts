import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2024-06-20',
});
export default async function POST(request: Request) {
	const signature = request.headers.get('stripe-signature');

	if (!signature) return NextResponse.error();

	const text = await request.text();
	try {
		const event = stripe.webhooks.constructEvent(
			text,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET_KEY as string
		);

		if (event.type === 'checkout.session.completed') {
			const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
				event.data.object.id,
				{
					expand: ['line_items'],
				}
			);
			const lineItems = sessionWithLineItems.line_items;

			console.log(lineItems);
		}
	} catch (error) {
		return NextResponse.error();
	}
	return NextResponse.json({ received: true });
}
