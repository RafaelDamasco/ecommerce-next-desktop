import { CartContext, CartProduct } from "@/provider/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleRemoveProductClick = () => {
    removeProductFromCart(product.id);
  };
  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(product.id);
  };
  const handleIncreaseProductQuantityClick = () => {
    increaseProductQuantity(product.id);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
            sizes="100vw"
            width={0}
            height={0}
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              R$ {product.totalPrice.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleDecreaseProductQuantityClick}
            >
              <ArrowLeftIcon size={16}></ArrowLeftIcon>
            </Button>
            <span className="text-xs">{product.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleIncreaseProductQuantityClick}
            >
              <ArrowRightIcon size={16}></ArrowRightIcon>
            </Button>
          </div>
        </div>
      </div>

      <Button size="icon" variant="outline" onClick={handleRemoveProductClick}>
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
