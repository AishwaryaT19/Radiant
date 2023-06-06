import { useGetUser } from "@/hooks/use-user";

export default function Checkoutform() {
  const user = useGetUser();
  return (
    <div className="check">
      <div className="title">
        <h3>Checkout</h3>
        <h4>Enter Your Details</h4>
      </div>
      <form action="submit" className="checkform">
        <input type="text" placeholder="Name" required id="name" defaultValue={user?.name} />
        <input
          type="text"
          pattern="[1-9]{1}[0-9]{9}"
          id="number"
          name="number"
          placeholder="Phone Number"
          required
          defaultValue={String(user?.phoneNumber)}
        />
        <input type="text" placeholder="Street" defaultValue={user?.address?.street} />
        <input type="text" placeholder="Building" />
        <input type="text" placeholder="Landmark" />
        <input type="text" placeholder="City" />
        <div className="state">
          <input type="state" placeholder="State" />
          <input type="" placeholder="Pincode" />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}
