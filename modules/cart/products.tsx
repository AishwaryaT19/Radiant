import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import React, { useEffect } from "react";

// const mapper = (elem: CategoryArrayType, index: number) => {
//   return <ItemCard key={index} />;
// };

export default function Products() {
  const [cart, setCart] = useCart();
  const cartClear = () => {
    let x = window.confirm("Are You Sure?");
    if (x) {
      setCart({});
    }
  };

  return (
    <div className="Products">
      <div className="card-info">
        <div className="title">
          <h1>Cart</h1>
          <span>(2 products)</span>
        </div>
        <button onClick={cartClear}>clear cart</button>
      </div>
      <div className="items-container">
        <ItemCard />
      </div>
    </div>
  );
}

function ItemCard(props: any) {
  return (
    <div className="item-card">
      <div className="img-container">
        <Image src="/try.jpg" fill sizes="100%" alt="" />
      </div>
      <h4>Apple Airpods Pro</h4>
      <div className="count">
        <button>-</button>
        <span>1</span>
        <button>+</button>
        <span>Rs 100</span>
        <button className="cancel">X</button>
      </div>
    </div>
  );
}
