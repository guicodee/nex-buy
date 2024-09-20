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

	let event;

	try {
		event = stripe.webhooks.constructEvent(
			text,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET_KEY as string
		);
	} catch (err) {
		console.error('Webhook signature verification failed:', err.message);
		return NextResponse.json(
			{ error: 'Webhook signature verification failed' },
			{ status: 400 }
		);
	}

	if (event.type === 'checkout.session.completed') {
		try {
			const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
				event.data.object.id,
				{ expand: ['line_items'] }
			);
			const lineItems = sessionWithLineItems.line_items;

			console.log(lineItems);
		} catch (err) {
			console.error('Error retrieving session with line items:', err);
			return NextResponse.json(
				{ error: 'Error retrieving line items' },
				{ status: 500 }
			);
		}
	}

	return NextResponse.json({ received: true });
}
