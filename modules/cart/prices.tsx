import React from "react";
import Link from "next/link";

const data: any = [
  // {
  //   name: "subtotal",
  //   price: 400,
  // },
  // {
  //   name: "discount",
  //   price: 400,
  // },
  {
    name: "total ...",
    price: 400
  }
];

const mapper = (elem: any, index: number) => {
  return <Listings key={index} name={elem.name} price={elem.price} />;
};

export default function Prices() {
  return (
    <div className="prices">
      <h3>Promo Code</h3>
      <div className="code">
        <input type="text" placeholder="Type here.." name="prop" id="promo" />
        <button title="promo" type="submit">
          Apply Now
        </button>
      </div>
      {data.map(mapper)}
      <Link href="/cart/checkout">Continue to Checkout</Link>
    </div>
  );
}
function Listings(props: any) {
  const { name, price } = props;
  return (
    <div className="price">
      <span>{name}</span>
      <span>{price}</span>
    </div>
  );
}
