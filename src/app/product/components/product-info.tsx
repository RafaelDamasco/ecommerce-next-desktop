"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductWithTotalPrice } from "@/helpers/product";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  TruckIcon,
} from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "basePrice" | "description" | "discountPercentage" | "totalPrice" | "name"
  >;
}

const ProductInfo = ({
  product: { basePrice, description, discountPercentage, totalPrice, name },
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{name}</h2>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">R$ {totalPrice.toFixed(2)}</h1>
        {discountPercentage > 0 && (
          <Badge className="px-2 py-[2px]">
            <ArrowDownIcon size={14} /> {discountPercentage}%
          </Badge>
        )}
      </div>
      {discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          R$ {Number(basePrice).toFixed(2)}
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
        <p className="text-justify text-sm opacity-60">{description}</p>
      </div>
      <Button className="mt-8 font-bold uppercase">Add to cart</Button>

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
