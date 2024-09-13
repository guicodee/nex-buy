import { computeProductTotalPrice } from "@/helpers/product"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import ProductItem from "./product-item"

interface ProductListProps {
  products: Product[]
  category: string
}

export default function ProductList({ products, category }: ProductListProps) {

  return (
    <div className="flex flex-col w-full gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
      <Link href={'/'} className="flex items-center gap-2 px-4">
        <h1 className="font-black text-lg uppercase hover:underline">{category}</h1>
        <ArrowRight size={18} />
      </Link>

      <div className="flex items-center gap-4">
        {products.map(( product ) => (
          <ProductItem key={product.id} product={computeProductTotalPrice(product)} />
        ))}
      </div>
    </div>
  )
}