import ProductList from "@/components/ui/product-list";
import { prismaClient } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import CategoryList from "./components/category-list";

export default async function Home() {
  const productsDiscount = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      }
    }
  })

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'keyboards'
      }
    }
  })
  
  return (
    <div className="space-y-12">
      <Image 
        width={0}
        height={0}
        src={'/banner-ofertas.png'}
        className="w-full mx-auto max-lg:hidden"
        sizes="100vw"
        alt="Até 55% de desconto nesse mês."
      />

      <div className="mx-auto flex flex-col px-5 gap-8 lg:container lg:gap-10">
        <Image 
          width={0}
          height={0}
          src={'/banner-descount.png'}
          sizes="100vw"
          className="h-auto w-full lg:hidden"
          alt="Até 55% de desconto nesse mês."
        />
        
        <CategoryList />
      </div>

      <div className="px-2 space-y-4">
        <ProductList products={productsDiscount} category="Ofertas" />
      </div>

      <div className="flex items-center px-5 gap-5">
        <Link href={'/'}>
          <Image 
            src={'/banner-mouses.png'}
            alt="Até 55% de desconto em mouses."
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </Link>
        <Link href={'/'}>
          <Image 
            src={'/banner-fones.png'}
            alt="Até 55% de desconto em fones."
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </Link>
      </div>

      <div className="px-2 space-y-4">
        <ProductList products={keyboards} category="Teclados" />
      </div>

      <div className="flex items-center px-5 gap-5">
        <Image 
          src={'/banner-fretegratis.png'}
          alt="Frete grátis para todo o Brasil."
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
