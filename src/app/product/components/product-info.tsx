"use client";
import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-badge";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/provider/cart";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addProductToCart } = useContext(CartContext);
  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    addProductToCart({ ...product, quantity });
  };
  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{product.name}</h2>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">
          R$ {product.totalPrice.toFixed(2)}
        </h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge>{product.discountPercentage}</DiscountBadge>
        )}
      </div>
      {product.discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          R$ {Number(product.basePrice).toFixed(2)}
        </p>
      )}

      <div className="mt-4 mt-8 flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={handleDecreaseQuantity}>
          <ArrowLeftIcon size={16}></ArrowLeftIcon>
        </Button>
        <span>{quantity}</span>
        <Button variant="outline" size="icon" onClick={handleIncreaseQuantity}>
          <ArrowRightIcon size={16}></ArrowRightIcon>
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-bold">Description</h3>
        <p className="text-justify text-sm opacity-60">{product.description}</p>
      </div>

      <Button className="mt-8 font-bold uppercase" onClick={handleAddToCart}>
        Add to cart
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-2">
          <TruckIcon />
          <div className="flex flex-col">
            <p className="text-xs">
              Delivery via <span className="font-bold">USPS</span>
            </p>
            <p className="text-xs text-[#8162ff]">
              Shipping throughout <span className="font-bold">USA</span>
            </p>
          </div>
        </div>
        <p className="text-xs font-bold">Free shipping</p>
      </div>
    </div>
  );
};

export default ProductInfo;
