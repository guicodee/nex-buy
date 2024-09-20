'use server';

import { CartProduct } from '@/providers/cart-provider';
import Stripe from 'stripe';

export default async function createCheckout(products: CartProduct[]) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
		apiVersion: '2024-06-20',
	});

	const productIds = products.map((product) => product.id).join(',');

	const checkout = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		mode: 'payment',
		success_url: 'http://localhost:3000/catalog',
		cancel_url: 'http://localhost:3000/',
		metadata: {
			products_ids: productIds,
		},
		line_items: products.map((product) => {
			return {
				price_data: {
					currency: 'brl',
					product_data: {
						name: product.name,
						description: product.description,
						images: product.imageUrls,
					},
					unit_amount: product.totalPrice * 100,
				},
				quantity: product.quantity,
			};
		}),
	});

	return checkout;
}
