import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RiInstagramFill, RiMailCloseFill, RiPhoneFill } from "react-icons/ri";

export const infs = [
  {
    inf: "The company principle of Architecture-Studio is the collective conception.", //short info for footer
    number: 1234567899, //phone number
    email: "prague-architects@info.com" //mail
  }
];

//socials
export const insta = "https://www.instagram.com/anime/"; //instagram link

export default function Footer() {
  return (
    <footer id="footer">
      <div className="img-container">
        <Image src="/logo.png" alt="logo" sizes="100%" fill />
      </div>
      <nav className="navigation">
        <Link href="/">Home</Link>
        <Link href="/">Categories</Link>
        <Link href="/">About Us</Link>
        <Link href="/">Testimonials</Link>
        <Link href="/">Contact Us</Link>
      </nav>
      <div className="contact">
        <h2>get in touch</h2>
        <div className="touch">
          <Link href={"tel:" + infs[0]?.number} target="_blank" rel="noopener noreferrer">
            <RiPhoneFill />
          </Link>
          <Link href={"mailto:" + infs[0]?.email} target="_blank" rel="noopener noreferrer">
            <RiMailCloseFill />
          </Link>
          <Link href={insta} target="_blank" rel="noopener noreferrer">
            <RiInstagramFill />
          </Link>
        </div>
      </div>
      <div className="desc">
        <span>{infs[0]?.inf}</span>
      </div>
    </footer>
  );
}
