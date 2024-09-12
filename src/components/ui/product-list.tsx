import { computeProductTotalPrice } from "@/helpers/product"
import { Product } from "@prisma/client"
import ProductItem from "./product-item"

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {

  return (
    <div className="flex w-full gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
      {products.map(( product ) => (
        <ProductItem key={product.id} product={computeProductTotalPrice(product)} />
      ))}
    </div>
  )
}