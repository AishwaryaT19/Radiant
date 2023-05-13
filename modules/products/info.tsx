import { useState, useEffect } from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useCart } from "@/hooks/use-cart";
import type { ProductImage, ProductProp } from "./types";

export default function Info(product: ProductProp) {
  const { sys, name, productDescription, price, salePercent, imagesCollection } = product;
  const id = sys.id;
  const [cart, setCart] = useCart();
  const [amount, setAmount] = useState<number>(0);
  const cartSetting = () => {
    setAmount(1);
  };
  useEffect(() => {
    if (amount > 0) {
      setCart({
        ...cart,
        [`${id}`]: {
          name: name,
          price: finalPrice,
          url: imagesCollection?.items[0]?.url ?? "/logo.png",
          numberOfItems: amount
        }
      });
    } else {
      if (cart[`${id}`]) {
        const tempCart = cart;
        delete tempCart[`${id}`];
        setCart(tempCart);
      }
    }
  }, [amount]);
  let finalPrice = price;
  if (salePercent !== null) {
    finalPrice = price - (salePercent / 100) * price;
  }
  const imagesCollectionitems = imagesCollection.items;
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
        {salePercent !== null ? (
          <span>
            ₹<del>{price}</del>
            {finalPrice}
          </span>
        ) : (
          <span>₹{finalPrice}</span>
        )}
        {salePercent !== null && <span className="sale">{salePercent}% OFF</span>}
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
