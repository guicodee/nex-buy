import { Button } from "@/components/ui/button";
import { CATEGORY_ICON } from "@/constats/category-icon";
import { prismaClient } from "@/lib/prisma";

export default async function CategoryList() {
  const categories = await prismaClient.category.findMany({});

  return (
    <div className="flex items-center justify-center gap-6 max-lg:grid max-lg:grid-cols-2">
      {categories.map((category) => (
        <Button key={category.id} variant={"outline"} >
          <div className="flex items-center px-4 gap-2">
            {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
            <span>{category.name}</span>
          </div>
        </Button>
      ))}
    </div>
  )
}