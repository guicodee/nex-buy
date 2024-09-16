'use client';

import { ProductWithTotalPrice } from '@/helpers/product';
import { createContext, ReactNode, useState } from 'react';

export interface CartProduct extends ProductWithTotalPrice {
	quantity: number;
}

interface ICartContext {
	products: CartProduct[];
	addProdcutsToCart: (product: CartProduct) => void;
	decreaseProductQuantity: (productId: string) => void;
	increaseProductQuantity: (productId: string) => void;
	removeProductToCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
	products: [],
	addProdcutsToCart: () => {},
	decreaseProductQuantity: () => {},
	increaseProductQuantity: () => {},
	removeProductToCart: () => {},
});

export default function CartProvider({ children }: { children: ReactNode }) {
	const [products, setProducts] = useState<CartProduct[]>([]);

	function addProdcutsToCart(product: CartProduct) {
		const productIsAlreadyOnCart = products.some(
			(productCart) => productCart.id === product.id
		);

		if (productIsAlreadyOnCart) {
			setProducts((prev) =>
				prev.map((productCart) => {
					if (productCart.id === product.id) {
						return {
							...productCart,
							quantity: productCart.quantity + product.quantity,
						};
					}
					return productCart;
				})
			);
			return;
		}

		setProducts((prev) => [...prev, product]);
	}

	function decreaseProductQuantity(productId: string) {
		setProducts((prev) =>
			prev
				.map((productCart) => {
					if (productCart.id === productId) {
						return {
							...productCart,
							quantity: productCart.quantity - 1,
						};
					}
					return productCart;
				})
				.filter((productCart) => productCart.quantity > 0)
		);
	}

	function increaseProductQuantity(productId: string) {
		setProducts((prev) =>
			prev.map((productCart) => {
				if (productCart.id === productId) {
					return {
						...productCart,
						quantity: productCart.quantity + 1,
					};
				}
				return productCart;
			})
		);
	}

	function removeProductToCart(productId: string) {
		setProducts((prev) =>
			prev.filter((productCart) => productCart.id !== productId)
		);
	}

	return (
		<CartContext.Provider
			value={{
				products,
				addProdcutsToCart,
				decreaseProductQuantity,
				increaseProductQuantity,
				removeProductToCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
