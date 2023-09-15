import React from "react";
import Image from "next/image";
import { testimonailPageHeading } from "./text";
import type { TestimonialArrayType, TestimonialProps, TestimonialType } from "./types";

const mapper = (elem: TestimonialArrayType, index: number) => {
  return (
    <TestimonialCard
      key={index}
      name={elem.user}
      imgUrl={elem.profilePicture?.url ?? "/logo.png"}
      testimonial={elem.feedback}
    />
  );
};
export default function Testimonials({ data }: TestimonialProps) {
  return (
    <div className="testimonials" id="testimonials">
      <h2>{testimonailPageHeading}</h2>
      <div className="cards-container">{data.map(mapper)}</div>
    </div>
  );
}

function TestimonialCard(props: TestimonialType) {
  const { name, imgUrl, testimonial } = props;
  return (
    <div className="testimonial-card">
      <p>{testimonial}</p>
      <span>{name}</span>
      <div className="img-container">
        <Image src={imgUrl} fill sizes="100%" alt="testimonial" />
      </div>
    </div>
  );
}
