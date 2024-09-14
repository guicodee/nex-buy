import Banner from '@/components/banner';
import ProductList from '@/components/ui/product-list';
import { prismaClient } from '@/lib/prisma';
import Link from 'next/link';
import CategoryList from './components/category-list';

export default async function Home() {
	const productsDiscount = await prismaClient.product.findMany({
		where: {
			discountPercentage: {
				gt: 0,
			},
		},
	});

	const keyboards = await prismaClient.product.findMany({
		where: {
			category: {
				slug: 'keyboards',
			},
		},
	});

	const mouses = await prismaClient.product.findMany({
		where: {
			category: {
				slug: 'mouses',
			},
		},
	});

	return (
		<div className="space-y-12 pb-8">
			<Banner
				alt="Até 55% de desconto nesse mês."
				src="/banner-ofertas.png"
				classname="max-lg:hidden"
			/>

			<div className="mx-auto flex flex-col px-5 gap-8 lg:container lg:gap-10">
				<Banner
					alt="Até 55% de desconto nesse mês."
					src="/banner-descount.png"
					classname="lg:hidden"
				/>

				<CategoryList />
			</div>

			<div className="px-2 space-y-4">
				<ProductList products={productsDiscount} category="Ofertas" />
			</div>

			<div className="lg:flex lg:items-center max-lg:px-5 lg:px-5 lg:gap-2">
				<Link href={'/'}>
					<Banner
						alt="Até 55% de desconto em mouses."
						src="/banner-mouses.png"
						classname="lg:mx-auto max-lg:hidden"
					/>
				</Link>

				<Link href={'/'}>
					<Banner
						alt="Até 55% de desconto em mouses."
						src="/banner-mouses-mobile.png"
						classname="lg:mx-auto lg:hidden"
					/>
				</Link>

				<Link href={'/'}>
					<Banner
						alt="Até 55% de desconto em fones."
						src="/banner-fones.png"
						classname="max-lg:hidden"
					/>
				</Link>
			</div>

			<div className="px-2 space-y-4">
				<ProductList products={keyboards} category="Teclados" />
			</div>

			<div className="lg:px-5 max-lg:px-5">
				<Banner
					alt="Frete grátis para todo o Brasil."
					src="/banner-fretegratis.png"
					classname="max-lg:hidden"
				/>

				<Link href={'/'} className="w-full">
					<Banner
						alt="Até 55% de desconto em fones."
						src="/banner-fones-mobile.png"
						classname="lg:hidden"
					/>
				</Link>
			</div>

			<div className="px-2 space-y-4">
				<ProductList products={mouses} category="Mouses" />
			</div>
		</div>
	);
}
