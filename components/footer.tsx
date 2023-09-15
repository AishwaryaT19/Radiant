import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RiInstagramFill, RiMailFill, RiPhoneFill } from "react-icons/ri";
import { email, phoneNumber } from "@/common-data";

//socials
export const insta = "https://www.instagram.com/anime/"; //instagram link

export default function Footer() {
  return (
    <footer id="footer">
      <Link href="/#landing-page" className="img-container">
        <Image src="/logo.png" alt="logo" sizes="100%" fill />
      </Link>
      <nav className="navigation">
        <Link href="/#landing-page">Home</Link>
        <Link href="/#category">Categories</Link>
        <Link href="/#about">About Us</Link>
        <Link href="/#testimonials">Testimonials</Link>
        <Link href="/#contact">Contact Us</Link>
      </nav>
      <div className="contact">
        <h2>get in touch</h2>
        <div className="touch">
          <Link href={"tel:" + phoneNumber} target="_blank" rel="noopener noreferrer">
            <RiPhoneFill />
          </Link>
          <Link href={"mailto:" + email} target="_blank" rel="noopener noreferrer">
            <RiMailFill />
          </Link>
          <Link href={insta} target="_blank" rel="noopener noreferrer">
            <RiInstagramFill />
          </Link>
        </div>
      </div>
      <div className="policies">
        <Link href="/return-and-refund" target="_blank" rel="noopener noreferrer">
          Return & Refund
        </Link>
        <Link href="/terms-of-service" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </Link>
        <Link href="/policies" target="_blank" rel="noopener noreferrer">
          Policies
        </Link>
      </div>
    </footer>
  );
}
