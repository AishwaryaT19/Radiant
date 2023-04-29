import Image from "next/image";
import React from "react";
import type { ProductProps } from "./types";

export default function HeroBanner({ products }: ProductProps) {
  return (
    <div className="hero-banner">
      <div className="img-container">
        <Image
          src={products[0]?.category?.bannerimage?.url ?? "/logo.png"}
          fill
          sizes="100%"
          alt={products[0]?.category?.title ?? "logo"}
        />
      </div>
      <div className="stuff-container">
        <h1>{products[0]?.category?.title ?? "No Products Found"}</h1>
        <p>{products[0]?.category?.description ?? " "}</p>
      </div>
    </div>
  );
}
