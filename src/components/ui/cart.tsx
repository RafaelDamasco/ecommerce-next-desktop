import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/provider/cart";

const Cart = () => {
  const { products } = useContext(CartContext);
  return (
    <div>
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant={"outline"}
      >
        <ShoppingCartIcon size={16} />
        Cart
      </Badge>
      {products.map((product) => (
        <h1>{product.name}</h1>
      ))}
    </div>
  );
};

export default Cart;
