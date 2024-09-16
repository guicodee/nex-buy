import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import AuthProvider from '@/providers/auth-provider';
import CartProvider from '@/providers/cart-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'NexBuy',
	description: 'Loja de periféricos para computadores.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${inter.className} antialiased`}>
				<div className="h-screen flex flex-col">
					<AuthProvider>
						<CartProvider>
							<Header />
							<div className="flex-1">{children}</div>
							<Footer />
						</CartProvider>
					</AuthProvider>
				</div>
			</body>
		</html>
	);
}
