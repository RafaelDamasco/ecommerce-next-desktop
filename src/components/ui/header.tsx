"use client";
import {
  HomeIcon,
  ListOrderedIcon,
  LogIn,
  LogOut,
  MenuIcon,
  PackageSearchIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import Cart from "./cart";

function Header() {
  const { status, data } = useSession();
  const handleLoginClick = async () => {
    await signIn();
  };
  const handleLogoutClick = async () => {
    await signOut();
  };
  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side={"left"}>
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>
          {status === "authenticated" && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>
                  {data.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>
                <p className="font-medium">{data.user.name}</p>
              </div>
              <Separator />
            </div>
          )}

          <div className="mt-4 flex flex-col gap-3">
            {status === "unauthenticated" && (
              <Button
                onClick={handleLoginClick}
                className="w-full justify-start gap-2"
                variant="outline"
              >
                <LogIn size={16} />
                Login
              </Button>
            )}
            {status === "authenticated" && (
              <Button
                onClick={handleLogoutClick}
                className="w-full justify-start gap-2"
                variant="outline"
              >
                <LogOut size={16} />
                Logout
              </Button>
            )}

            <SheetClose asChild>
              <Link href="/">
                <Button
                  className="w-full justify-start gap-2"
                  variant="outline"
                >
                  <HomeIcon size={16} />
                  Home
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/orders">
                <Button
                  className="w-full justify-start gap-2"
                  variant="outline"
                >
                  <PackageSearchIcon size={16} />
                  My Orders
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/deals">
                <Button
                  className="w-full justify-start gap-2"
                  variant="outline"
                >
                  <PercentIcon size={16} />
                  Offer
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={"/catalog"}>
                <Button
                  className="w-full justify-start gap-2"
                  variant="outline"
                >
                  <ListOrderedIcon size={16} />
                  Catalog
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
      <Link href={"/"}>
        <h1 className="text-lg font-semibold">
          <span className="text-primary">E-</span>commerce
        </h1>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <ShoppingCartIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <Cart />
        </SheetContent>
      </Sheet>
    </Card>
  );
}

export default Header;
