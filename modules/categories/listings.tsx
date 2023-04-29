import Image from "next/image";
import React from "react";
import type { ProductProps } from "../categories/types";
import { BsFillCartPlusFill as ButtonLogo } from "react-icons/bs";
import Link from "next/link";

const mapper = (elem: any, index: number) => {
  return (
    <ProductCard
      key={index}
      name={elem?.name ?? "none"}
      imgUrl={elem?.bannnerImage?.url ?? "/logo.png"}
      price={elem.price}
      saleprice={elem.salePrice}
      sale={elem.sale}
      category={elem.category.title}
    />
  );
};

export default function Listings({ products }: ProductProps) {
  return <div className="listing">{products.map(mapper)}</div>;
}

function ProductCard(props: any) {
  const { name, imgUrl, price, saleprice, sale, category } = props;
  let saleper = 0;
  if (sale == true) {
    saleper = Math.ceil((((price - saleprice) / price) * 100) / 10) * 10;
  }
  return (
    <Link
      href={
        "/" + category.replaceAll(" ", "-") + "/" + name.replaceAll(" ", "-")
      }
      className="item-card"
    >
      <div className="img-container">
        <Image fill src={imgUrl} sizes="100%" alt="pr" />
      </div>
      <div className="stuff-container">
        <h3>{name}</h3>
        {sale == true ? (
          <span>
            ₹<del>{price}</del>
            {saleprice}
          </span>
        ) : (
          <span>₹{price}</span>
        )}
      </div>
      {sale == true && <span className="sale">{saleper}% OFF</span>}
      <button type="button" title="Add to Cart">
        <ButtonLogo />
      </button>
    </Link>
  );
}
