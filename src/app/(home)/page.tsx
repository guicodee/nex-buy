import ProductList from "@/components/ui/product-list";
import { prismaClient } from "@/lib/prisma";
import Image from "next/image";
import CategoryList from "./components/category-list";

export default async function Home() {
  const productsDiscount = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
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

      <div className="px-2">
        <ProductList products={productsDiscount} />
      </div>
    </div>
  );
}
