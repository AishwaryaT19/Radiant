import React from "react";
import { useRouter } from "next/router";
import { useGetLoginModal } from "@/hooks/use-login-modal";
import { useGetUser } from "@/hooks/use-user";

const data: any = [
  {
    name: "total ...",
    price: 400
  }
];

const mapper = (elem: any, index: number) => {
  return <Listings key={index} name={elem.name} price={elem.price} />;
};

export default function Prices() {
  const user = useGetUser();
  const router = useRouter();
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
      <button className="check" onClick={loginButtonHandler}>
        Continue to Checkout
      </button>
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
