import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProductProps } from "../categories/types";

const mapper = (elem: any, index: number) => {
  return (
    <ProductCard
      key={index}
      name={elem?.name ?? "none"}
      imgUrl={elem?.bannnerImage?.url ?? "/logo.png"}
      price={elem.price}
      salePercent={elem.salePercent}
      category={elem.category.title}
    />
  );
};

export default function Listings({ products }: ProductProps) {
  return <div className="listing">{products.map(mapper)}</div>;
}

function ProductCard(props: any) {
  const { name, imgUrl, price, salePercent, category } = props;
  let finalPrice = price;
  if (salePercent !== null) {
    finalPrice = price - (salePercent / 100) * price;
  }
  return (
    <Link
      href={"/" + category.replaceAll(" ", "-").toLowerCase() + "/" + name.replaceAll(" ", "-").toLowerCase()}
      className="item-card"
    >
      <div className="img-container">
        <Image fill src={imgUrl} sizes="100%" alt="pr" />
      </div>
      <div className="stuff-container">
        <h3>{name}</h3>
        {salePercent !== null ? (
          <span>
            ₹<del>{price}</del>
            {finalPrice}
          </span>
        ) : (
          <span>₹{finalPrice}</span>
        )}
      </div>
      {salePercent !== null && <span className="sale">{salePercent}% OFF</span>}
    </Link>
  );
}
