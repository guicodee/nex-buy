import {
  House,
  ListCollapse,
  LogIn,
  MenuIcon,
  Percent,
  ShoppingBag,
  ShoppingCart
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet";

export default function Header() {

  return (
    <Card className="px-7 py-4 flex justify-between items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <MenuIcon size={16} />
          </Button>
        </SheetTrigger>

        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle className="mb-4">Menu</SheetTitle>
          </SheetHeader>

          <Separator />

          <div className="mt-4 flex flex-col gap-3">
            <Button variant={"outline"} className="w-full justify-start gap-2">
              <LogIn size={18} />
              Fazer login
            </Button>
            <Button variant={"outline"} className="w-full justify-start gap-2">
              <House size={18} />
              Início
            </Button>
            <Button variant={"outline"} className="w-full justify-start gap-2">
              <Percent size={18} />
              Ofertas
            </Button>
            <Button variant={"outline"} className="w-full justify-start gap-2">
              <ListCollapse size={18} />
              Catálogo
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Link href={'/'} className="flex items-center gap-3">
        <ShoppingBag size={32} />
        <p className="text-zinc-200 font-black uppercase text-xl tracking-wider">NexBuy</p>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <ShoppingCart size={16} />
          </Button>
        </SheetTrigger>

        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle>Carrinho</SheetTitle>
          </SheetHeader>
          
        </SheetContent>
      </Sheet>

    </Card>
  )
}