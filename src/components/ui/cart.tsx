import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/provider/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { createOrder } from "@/actions/order";

const Cart = () => {
  const { products, total, subtotal, totalDiscount } = useContext(CartContext);
  const { data } = useSession();

  const handleCheckoutClick = async () => {
    if (!data?.user) {
      // TODO redirect to login
      return;
    }

    const order = await createOrder(products, (data.user as any).id);

    const checkout = await createCheckout(products, order.id);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };
  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant={"outline"}
      >
        <ShoppingCartIcon size={16} />
        Cart
      </Badge>

      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-5">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  product={computeProductTotalPrice(product) as any}
                  key={product.id}
                />
              ))
            ) : (
              <p className="text-center font-semibold">Empty cart.</p>
            )}
          </div>
        </ScrollArea>
      </div>

      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Subtotal</p>
            <p>R$ {subtotal.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Delivery</p>
            <p>FREE</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Discounts</p>
            <p>- R${totalDiscount.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs font-bold">
            <p>Total</p>
            <p>- R${total.toFixed(2)}</p>
          </div>

          <Button
            className="mt-7 font-bold uppercase"
            onClick={handleCheckoutClick}
          >
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
