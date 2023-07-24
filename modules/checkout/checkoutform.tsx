import { useEffect, useCallback, type FormEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useGetCart } from "@/hooks/use-cart";
import { useGetUser } from "@/hooks/use-user";
import { promocode } from "../cart/prices";

export default function Checkoutform() {
  const user = useGetUser();
  const router = useRouter();
  const cart = useGetCart();

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const cartArr: {
        id: string;
        noi: number;
      }[] = [];
      Object.keys(cart).forEach(function forEachInner(id) {
        cartArr.push({ id: id, noi: cart[id]?.numberOfItems ?? 0 });
      });

      const finalCartString = Buffer.from(JSON.stringify({ cart: cartArr, promo: promocode })).toString("base64");
      axios
        .post("/api/checkout", { data: finalCartString })
        .then((res) => {
          if (res?.data?.url) {
            router.push(res.data.url);
          }
        })
        .catch((e) => console.log(e));
    },
    [cart]
  );

  useEffect(() => {
    if (!user) {
      router.push("/cart");
    }
  }, [router, user]);
  return (
    <div className="check">
      <div className="title">
        <h3>Checkout</h3>
        <h4>Enter Your Details</h4>
      </div>
      <form action="submit" className="checkform" onSubmit={onSubmit}>
        <input type="text" placeholder="Name" required id="name" defaultValue={user?.name} />
        <input
          type="text"
          pattern="[1-9]{1}[0-9]{9}"
          id="number"
          name="number"
          placeholder="Phone Number"
          required
          defaultValue={user?.phoneNumber}
        />
        <input type="text" placeholder="Street" defaultValue={user?.addressStreet} />
        <input type="text" placeholder="Building" defaultValue={user?.addressBuilding} />
        <input type="text" placeholder="Landmark" defaultValue={user?.addressLandmark} />
        <input type="text" placeholder="City" defaultValue={user?.addressCity} />
        <div className="state">
          <input type="state" placeholder="State" defaultValue={user?.addressState} />
          <input type="" placeholder="Pincode" defaultValue={user?.addressPincode} />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}
