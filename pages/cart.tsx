import React from "react";
import Products from "@/modules/cart/products";
import Prices from "@/modules/cart/prices";

export default function Cart() {
  return (
    <section id="Cart">
      <Products />
      <Prices />
    </section>
  );
}
