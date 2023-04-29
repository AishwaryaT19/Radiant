import Image from "next/image";
import React from "react";
import {
  contactUsHeading,
  contactUsMail,
  contactUsName,
  contactUsNumber,
  contactUsSubmitButton,
  contactUsText,
} from "./text";

export default function Contact() {
  return (
    <div className="contact">
      <div className="img-container">
        <Image
          src="/assets/images/cherryblossom.png"
          fill
          sizes="100%"
          alt=""
        />
      </div>
      <h2>{contactUsHeading}</h2>
      <form className="contact-form">
        <div className="main-name">
          <label htmlFor="name">{contactUsName}</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="number-main">
          <label htmlFor="number">{contactUsNumber}</label>
          <input
            type="text"
            pattern="[1-9]{1}[0-9]{9}"
            id="number"
            name="number"
            placeholder="Phone Number"
          />
        </div>
        <div className="mail-main">
          <label htmlFor="mail">{contactUsMail}</label>
          <input
            type="email"
            id="mail"
            name="mail"
            placeholder="Your Mail-Id"
          />
        </div>
        <div className="text-main">
          <label htmlFor="text">{contactUsText}</label>
          <textarea rows={8} id="text" name="text" placeholder="Your Text" />
        </div>
        <button type="submit" id="submit">
          {contactUsSubmitButton}
        </button>
      </form>
    </div>
  );
}
