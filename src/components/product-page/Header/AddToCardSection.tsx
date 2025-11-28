"use client";

"use client";

import CartCounter from "@/components/ui/CartCounter";
import React, { useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
import { Product } from "@/types/product.types";

const AddToCardSection = ({ data }: { data: Product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const maxStock = data.stock ?? Infinity;
  const isOutOfStock = maxStock <= 0;

  const handleChangeQuantity = (value: number) => {
    if (value > maxStock) return;
    setQuantity(value);
  };

  return (
    <div className="fixed md:relative w-full bg-white border-t md:border-none border-black/5 bottom-0 left-0 p-4 md:p-0 z-10 flex items-center justify-between sm:justify-start md:justify-center">
      <CartCounter onAdd={handleChangeQuantity} onRemove={handleChangeQuantity} />
      <AddToCartBtn data={{ ...data, quantity }} disabled={isOutOfStock} />
    </div>
  );
};

export default AddToCardSection;
