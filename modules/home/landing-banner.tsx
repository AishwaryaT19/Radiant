import React from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonText, mainHeading, subHeading } from "./text";

export default function LandingBanner() {
  return (
    <div className="landing">
      <main className="head">
        <h1>{mainHeading}</h1>
        <p>{subHeading}</p>
        <Link href="/#category">{buttonText}</Link>
      </main>
      <div className="img-container">
        <Image priority src="/logo.png" alt="main-logo" sizes="100%" fill />
      </div>
    </div>
  );
}
