import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useGetCart } from "@/hooks/use-cart";
import { useGetLoginModal } from "@/hooks/use-login-modal";
import { useGetUser } from "@/hooks/use-user";

export let promocode: undefined | string = undefined;

export default function Prices() {
  const user = useGetUser();
  const router = useRouter();
  const cart = useGetCart();
  const [discount, setDiscount] = useState<number>(0);
  const [disper, setDisPer] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const promoRef = useRef<HTMLInputElement>(null);
  const loginModalRef = useGetLoginModal();

  const loginButtonHandler = () => {
    if (user) {
      router.push("/cart/checkout");
    } else if (loginModalRef?.current) {
      loginModalRef.current.showModal();
    } else {
      alert("something went wrong");
    }
  };
  const onPromoSubmitHandler = () => {
    const extractedPromo: string = promoRef.current?.value ?? "";
    const code = Buffer.from(extractedPromo).toString("base64");
    const postUrl = "/api/check-promo-code";
    axios
      .post(postUrl, { code: code })
      .then((res) => {
        alert("Discount Applied");
        promocode = extractedPromo;
        setDisPer(res.data[0].discountPercentage);
        setDiscount(+((disper / 100) * totalPrice).toFixed(2));
      })
      .catch((err) => {
        if (err.response.status === 404) {
          alert("Promor Code is Invalid");
          setDiscount(0);
        } else {
          alert("Something went wrong");
        }
      });
  };
  useEffect(() => {
    const price = Object.values(cart)
      .map((elem: any) => {
        return elem.price * elem.numberOfItems;
      })
      .reduce((price: number, nprice: number) => {
        return price + nprice;
      }, 0);
    setTotalPrice(+price.toFixed(2));
    setDiscount(+((disper / 100) * totalPrice).toFixed(2));
  }, [cart, totalPrice, disper]);
  return (
    <div className="prices">
      <h3>Promo Code</h3>
      <div className="code">
        <input type="text" placeholder="Type here.." name="prop" id="promo" ref={promoRef} />
        <button title="promo" type="submit" onClick={onPromoSubmitHandler}>
          Apply Now
        </button>
      </div>
      <div className="price">
        <span>subtotal</span>
        <span>{totalPrice}</span>
      </div>
      {discount > 0 && (
        <div className="price">
          <span>discount</span>
          <span>-{discount}</span>
        </div>
      )}
      <div className="price">
        <span>total</span>
        <span>{totalPrice - discount}</span>
      </div>
      <button className="check" onClick={loginButtonHandler}>
        Continue to Checkout
      </button>
    </div>
  );
}
