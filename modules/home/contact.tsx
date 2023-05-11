import Image from "next/image";
import React, { type FormEventHandler } from "react";
import {
  contactUsHeading,
  contactUsMail,
  contactUsName,
  contactUsNumber,
  contactUsSubmitButton,
  contactUsText,
} from "./text";
import axios from "axios";

export default function Contact() {
  const onSub: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const targets = event.target as unknown as HTMLInputElement[];
    const name = targets[0]?.value ?? "";
    const number = targets[1]?.value ?? "";
    const mail = targets[2]?.value ?? "";
    const text = targets[3]?.value ?? "";
    const dataToSend: string[] = [name, number, mail, text];
    const entries = [
      "entry.1962934510",
      "entry.823058088",
      "entry.1829671278",
      "entry.1643474162",
    ];
    const formID = "1Z0fN_sJF8UMwqqJDEpY4cLvBznzdEiks9L4dWqZPXnw";
    var urlAttr = "";
    for (let i = 0; i < dataToSend.length; i++) {
      //   :/?#[]@!$&'()*+,;=%
      var temp = (dataToSend[i] ?? "")
        .replace("%", "%25")
        .replace(" ", "%20")
        .replace(":", "%3A")
        .replace("/", "%2F")
        .replace("?", "%3F")
        .replace("#", "%23")
        .replace("[", "%5B")
        .replace("]", "%5D")
        .replace("@", "%40")
        .replace("!", "%21")
        .replace("$", "%24")
        .replace("&", "%26")
        .replace("'", "%27")
        .replace("(", "%28")
        .replace(")", "%29")
        .replace("*", "%2A")
        .replace("+", "%2B")
        .replace(",", "%2C")
        .replace(";", "%3B")
        .replace("=", "%3D");
      var temp2 = entries[i] + "=" + temp;
      if (!(temp2 === " " || temp2 === "")) {
        urlAttr += temp2;
      }

      if (i !== dataToSend.length - 1) {
        urlAttr += "&";
      }
    }

    var url =
      "https://docs.google.com/forms/d/" + formID + "/formResponse?" + urlAttr;

    try {
      axios.post(url, null).catch(() => {});
    } catch {}
  };
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
      <form className="contact-form" onSubmit={onSub}>
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
