import { ProductWithTotalPrice } from "@/helpers/product"
import Image from "next/image"
import Link from "next/link"
import DiscountBadge from "../discount-badge"

interface ProductItemProps {
  product: ProductWithTotalPrice
}

export default function ProductItem({ product }: ProductItemProps) {

  return (
    <Link href={'/'}>
      <div className="flex flex-col gap-4 w-[156px]">
        <div className="relative bg-accent rounded-lg h-[170px] flex items-center justify-center">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-auto max-w-[80%] max-h-[70%] object-contain"
          />

          {product.discountPercentage > 0 && (
            <div className="absolute left-2 top-2">
              <DiscountBadge>{product.discountPercentage}</DiscountBadge>
            </div>
          )}
        </div>

        <div>
          <p className="text-zinc-200 text-sm truncate">{product.name}</p>
          {product.discountPercentage > 0 ? (
            <div className="flex items-center text-xs gap-2 truncate">
              <p className="text-zinc-200 text-sm font-black">R$ {product.totalPrice.toFixed(2)}</p>  
              <p className="text-zinc-400 tracking-wide line-through">R$ {Number(product.basePrice).toFixed(2)}</p>
            </div>
          ) : ( 
            <p className="text-zinc-200 text-sm font-black">R$ {Number(product.basePrice)}</p>
          )}
        </div>
      </div>
    </Link>
  )
}