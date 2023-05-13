import React from "react";
import Image from "next/image";
import Link from "next/link";
import { homeAboutcontent, homeAboutHeading, homeAboutLink } from "./text";

export default function About() {
  return (
    <div className="about-intro">
      <div className="stuff-container">
        <h2>{homeAboutHeading}</h2>
        <p>{homeAboutcontent}</p>
        <Link href={"/#category"}>{homeAboutLink}</Link>
      </div>
      <div className="img-container">
        <Image src="/try.jpg" fill sizes="100%" alt="About-Image" />
      </div>
    </div>
  );
}
