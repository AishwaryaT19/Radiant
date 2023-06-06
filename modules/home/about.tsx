import React from "react";
import Image from "next/image";
import Link from "next/link";
import { homeAboutHeading } from "./text";
import { AboutProps } from "./types";

export default function About({ data }: AboutProps) {
  return (
    <div className="about-intro" id="about">
      <div className="stuff-container">
        <h2>{homeAboutHeading}</h2>
        <p>{data[0]?.description}</p>
        <Link href={data[0]?.buttonLink ?? "/#category"}>{data[0]?.buttonText}</Link>
      </div>
      <div className="img-container">
        <Image src={data[0]?.image?.url ?? "/try.png"} fill sizes="100%" alt="About-Image" />
      </div>
    </div>
  );
}
