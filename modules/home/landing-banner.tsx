import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LandingProps } from "./types";

export default function LandingBanner({ data }: LandingProps) {
  return (
    <div className="landing" id="landing-page">
      <main className="head">
        <h1>{data[0]?.heading}</h1>
        <p>{data[0]?.subHeading}</p>
        <Link href={data[0]?.buttonLink ?? "/#category"}>{data[0]?.buttonText}</Link>
      </main>
      <div className="img-container">
        <Image priority src="/logo.png" alt="main-logo" sizes="100%" fill />
      </div>
    </div>
  );
}
