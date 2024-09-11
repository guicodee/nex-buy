import { LogIn, LogOut, User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import CustomButton from "./custom-button";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet";

interface SheetUserProps {
  handleSignIn: () => void
  handleSignOut: () => void
}

export default function SheetUser({ handleSignIn, handleSignOut }: SheetUserProps) {
  const { data, status } = useSession()

  return (
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

        {status === "authenticated" && data.user ? (
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
        ) : (
          <h1 className="mb-6 text-zinc-100 text-sm">
            Faça login e fique por dentro de todas as promoções e novidades.
          </h1>
        )}

        <Separator />

        <div className="mt-4">
          {status === "unauthenticated" ? (
            <CustomButton 
              onClick={handleSignIn} 
              text="Login" 
              icon={<LogIn size={18} />} 
              variant={"outline"} 
            />
          ) : (
            <CustomButton 
              onClick={handleSignOut} 
              text="Desconectar" 
              icon={<LogOut size={18} />} 
              variant={"outline"} 
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}