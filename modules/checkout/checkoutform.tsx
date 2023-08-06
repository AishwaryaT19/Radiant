import { useEffect, useCallback, type FormEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useGetCart } from "@/hooks/use-cart";
import { useGetUser } from "@/hooks/use-user";
import { promocode } from "../cart/prices";
import { UserType } from "@/provider/app-context";

export default function Checkoutform() {
  const user = useGetUser();
  const router = useRouter();
  const cart = useGetCart();

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const target = event.target as unknown as HTMLInputElement[];
      const cartArr: {
        id: string;
        noi: number;
      }[] = [];
      Object.keys(cart).forEach(function forEachInner(id) {
        cartArr.push({ id: id, noi: cart[id]?.numberOfItems ?? 0 });
      });
      const custDeets: Omit<UserType, "image"> = {
        name: target[0]?.value ?? "user",
        phoneNumber: target[1]?.value ?? "",
        email: target[2]?.value ?? "",
        addressBuilding: target[4]?.value ?? "",
        addressStreet: target[3]?.value ?? "",
        addressLandmark: target[5]?.value ?? "",
        addressCity: target[6]?.value ?? "",
        addressState: target[7]?.value ?? "",
        addressPincode: +(target[8]?.value ?? "")
      };
      const finalCartString = Buffer.from(
        JSON.stringify({ cart: cartArr, promo: promocode, customerDetails: custDeets })
      ).toString("base64");
      axios
        .post("/api/checkout", { data: finalCartString })
        .then((res) => {
          if (res?.data?.url) {
            router.push(res.data.url);
          }
        })
        .catch();
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
          defaultValue={user?.phoneNumber.substring(2)}
        />
        <input type="email" placeholder="Email" required defaultValue={user?.email} />
        <input type="text" placeholder="Street" required defaultValue={user?.addressStreet} />
        <input type="text" placeholder="Building" defaultValue={user?.addressBuilding} />
        <input type="text" placeholder="Landmark" defaultValue={user?.addressLandmark} />
        <input type="text" placeholder="City" defaultValue={user?.addressCity} />
        <div className="state">
          <input type="state" placeholder="State" required defaultValue={user?.addressState} />
          <input type="" placeholder="Pincode" required defaultValue={user?.addressPincode} />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}
