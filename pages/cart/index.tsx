import React from "react";
import Prices from "@/modules/cart/prices";
import Products from "@/modules/cart/products";

export default function Cart() {
  return (
    <section id="Cart">
      <Products />
      <Prices />
    </section>
  );
}
