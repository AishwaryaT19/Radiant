import React from "react";

export default function Checkoutform() {
  return (
    <div className="check">
      <div className="title">
        <h3>Checkout</h3>
        <h4>Enter Your Details</h4>
      </div>
      <form action="submit" className="checkform">
        <input type="text" placeholder="Name" required id="name" />
        <input
          type="text"
          pattern="[1-9]{1}[0-9]{9}"
          id="number"
          name="number"
          placeholder="Phone Number"
          required
        />
        <input type="email" id="mail" name="mail" placeholder="Your Mail-Id" />
        <input type="text" placeholder="Address" />
        <div className="state">
          <input type="state" placeholder="State" />
          <input type="" placeholder="Pincode" />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}
