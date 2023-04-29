import Image from "next/image";
import React from "react";
import type { ProductImage, ProductProp } from "./types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useCart } from "@/hooks/use-cart";
import { useState, useEffect } from "react";

export default function Info(product: ProductProp) {
  const {
    sys,
    name,
    productDescription,
    price,
    sale,
    salePrice,
    imagesCollection,
  } = product;
  const id = sys.id;
  const [cart, setCart] = useCart();
  const [amount, setAmount] = useState<number>(0);
  const cartSetting = () => {
    setAmount(1);
  };
  useEffect(() => {
    setCart({
      ...cart,
      [`${id}`]: {
        name: name,
        price: price,
        sale: sale,
        saleprice: salePrice,
        url: imagesCollection?.items[0]?.url ?? "/logo.png",
        numberOfItems: amount,
      },
    });
  }, [amount]);
  let saleper = 0;
  if (sale == true) {
    saleper = Math.ceil((((price - salePrice) / price) * 100) / 10) * 10;
  }
  let imagesCollectionitems = imagesCollection.items;
  if (imagesCollectionitems.length < 4) {
    for (let i = 0; i < 4 - imagesCollectionitems.length; i++) {
      imagesCollectionitems.push(imagesCollectionitems[i] as any);
    }
  }
  return (
    <div className="info">
      <div className="images">
        {imagesCollectionitems.map((elem, index) => {
          return <ImgCard key={index} imgUrl={elem.url} />;
        })}
      </div>
      <div className="stuff-container">
        <h2>{name}</h2>
        {sale == true ? (
          <span>
            ₹<del>{price}</del>
            {salePrice}
          </span>
        ) : (
          <span>₹{price}</span>
        )}
        {sale == true && <span className="sale">{saleper}% OFF</span>}
        {documentToReactComponents(productDescription.json)}
        {amount == 0 ? (
          <button onClick={cartSetting}>Add to Cart</button>
        ) : (
          <div className="adder">
            <button
              onClick={() => {
                setAmount((prevamt) => {
                  return --prevamt;
                });
              }}
            >
              -
            </button>
            <span>{amount}</span>
            <button
              onClick={() => {
                setAmount((prevamt) => {
                  return ++prevamt;
                });
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ImgCard(props: ProductImage) {
  const { imgUrl } = props;
  return (
    <div className="img-container">
      <Image src={imgUrl} fill sizes="100%" alt=".." />
    </div>
  );
}
