import { CartProduct } from '@/providers/cart-provider';

export function getLocalStorageCartProducts(): CartProduct[] {
	try {
		const localStorageCartProducts = localStorage.getItem(
			'@cart-products/products'
		);
		if (localStorageCartProducts) {
			return JSON.parse(localStorageCartProducts) as CartProduct[];
		}
		return [];
	} catch (error) {
		console.error('Error parsing localStorage data', error);
		return [];
	}
}
