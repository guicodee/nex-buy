'use client'

import {
  House,
  ListCollapse,
  LogIn,
  LogOut,
  MenuIcon,
  Percent,
  ShoppingBag,
  ShoppingCart,
  User2
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
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
  const { data, status } = useSession()

  async function handleSignIn() {
    await signIn('google')
  }

  async function handleSignOut() {
    await signOut()
  }

  return (
    <>
      <Card className="px-20 py-8 flex justify-between items-center max-md:hidden">
        <Link href={'/'} className="flex items-center gap-3">
          <ShoppingBag size={32} />
          <p className="text-zinc-200 font-black uppercase text-xl tracking-wider">NexBuy</p>
        </Link>

        <div className="flex items-center gap-4 h-5">
          <Link href={'/'} className="hover:underline hover:text-zinc-300">
            Início
          </Link>
          <Separator orientation="vertical" />
          <Link href={'/'} className="hover:underline hover:text-zinc-300">
            Catálogo
          </Link>
          <Separator orientation="vertical" />
          <Link href={'/'} className="hover:underline hover:text-zinc-300">
            Ofertas
          </Link>
        </div>

        <div className="flex items-center gap-7">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <User2 size={16} />
              </Button>
            </SheetTrigger>

            <SheetContent side={"right"}>
              <SheetHeader>
                <SheetTitle className="mb-4">Perfil</SheetTitle>
              </SheetHeader>

              {status === "authenticated" && data.user && (
                <div className="flex items-center gap-2 mb-6">
                  <Image 
                    src={data.user.image!}
                    alt={data.user.name!}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  
                  <div>
                    <span className="text-zinc-200 text-sm">{data.user.name}</span>
                    <h1 className="text-zinc-400 text-xs">{data?.user?.email}</h1>
                  </div>
                </div>
              )}

              {status === "unauthenticated" ? (
                <Button variant={"outline"} className="w-full justify-start gap-2" onClick={handleSignIn}>
                  <LogIn size={18} />
                  Fazer login
                </Button>
              ) : (
                <Button variant={"outline"} className="w-full justify-start gap-2" onClick={handleSignOut}>
                  <LogOut size={18} />
                  Desconectar
                </Button>
              )}
            </SheetContent>
          </Sheet>

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
        </div>
      </Card>

      <Card className="px-7 py-4 flex justify-between items-center md:hidden">
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

            {status === "authenticated" && data.user && (
              <div className="flex items-center gap-2 mb-6">
                <Image 
                  src={data.user.image!}
                  alt={data.user.name!}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                
                <div >
                  <span className="text-zinc-200 text-sm">{data.user.name}</span>
                  <h1 className="text-zinc-400 text-xs">{data?.user?.email}</h1>
                </div>
              </div>
            )}

            <Separator />

            <div className="mt-4 flex flex-col gap-3">

              {status === "unauthenticated" ? (
                <Button variant={"outline"} className="w-full justify-start gap-2" onClick={handleSignIn}>
                  <LogIn size={18} />
                  Fazer login
                </Button>
              ) : (
                <Button variant={"outline"} className="w-full justify-start gap-2" onClick={handleSignOut}>
                  <LogOut size={18} />
                  Desconectar
                </Button>
              )}
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
    </>
  )
}