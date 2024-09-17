'use client';

import { getLocalStorageCartProducts } from '@/helpers/get-local-storage';
import { ProductWithTotalPrice } from '@/helpers/product';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

export interface CartProduct extends ProductWithTotalPrice {
	quantity: number;
}

interface ICartContext {
	products: CartProduct[];
	cartTotalPrice: number;
	cartBasePrice: number;
	cartTotalDiscount: number;
	subtotal: number;
	total: number;
	totalDiscount: number;
	addProdcutsToCart: (product: CartProduct) => void;
	decreaseProductQuantity: (productId: string) => void;
	increaseProductQuantity: (productId: string) => void;
	removeProductToCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
	products: [],
	cartTotalPrice: 0,
	cartBasePrice: 0,
	cartTotalDiscount: 0,
	subtotal: 0,
	total: 0,
	totalDiscount: 0,
	addProdcutsToCart: () => {},
	decreaseProductQuantity: () => {},
	increaseProductQuantity: () => {},
	removeProductToCart: () => {},
});

export default function CartProvider({ children }: { children: ReactNode }) {
	const cartProducts = getLocalStorageCartProducts();
	const [products, setProducts] = useState<CartProduct[]>(cartProducts);

	useEffect(() => {
		localStorage.setItem('@cart-products/products', JSON.stringify(products));
	}, [products]);

	const subtotal = useMemo(() => {
		return products.reduce((acc, product) => {
			return acc + Number(product.basePrice) * product.quantity;
		}, 0);
	}, [products]);

	const total = useMemo(() => {
		return products.reduce((acc, product) => {
			return acc + Number(product.totalPrice) * product.quantity;
		}, 0);
	}, [products]);

	const totalDiscount = subtotal - total;

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
				subtotal,
				total,
				totalDiscount,
				addProdcutsToCart,
				decreaseProductQuantity,
				increaseProductQuantity,
				removeProductToCart,
				cartBasePrice: 0,
				cartTotalDiscount: 0,
				cartTotalPrice: 0,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
