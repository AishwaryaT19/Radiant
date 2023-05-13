import React from "react";
import Image from "next/image";
import { testimonailPageHeading } from "./text";
import type { TestimonialType } from "./types";

const mapper = (elem: TestimonialType, index: number) => {
  return <TestimonialCard key={index} name={elem.name} imgUrl={elem.imgUrl} testimonial={elem.testimonial} />;
};
export default function Testimonials() {
  return (
    <div className="testimonials">
      <h2>{testimonailPageHeading}</h2>
      <div className="cards-container">
        {Array(4)
          .fill({
            name: `Handmade Soaps`,
            imgUrl: `/logo.png`,
            testimonial: `lorem ipsum ilaih ihilahfkl jkhk nhkhk nhhn nhn hnh nn njnm lorem ipsum ilaih ihilahfkl jkhk\
nhkhk nhhn nhn hnh nn njnm lorem ipsum ilaih ihilahfkl jkhk nhkhk nhhn nhn hnh nn njnm`
          })
          .map(mapper)}
      </div>
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
