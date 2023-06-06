import React, { type RefObject, type Ref, forwardRef } from "react";
import Link from "next/link";
import { GiCrossMark } from "react-icons/gi";

const Nav = (_: unknown, passedRef: Ref<HTMLDialogElement>) => {
  const ref = passedRef as RefObject<HTMLDialogElement>;
  const closeHandler = () => {
    if (ref.current) {
      ref.current.close();
    }
  };
  return (
    <dialog ref={ref} className="navmodal">
      <button className="cancel" onClick={closeHandler}>
        <GiCrossMark />
      </button>
      <div className="nav">
        <Link href="/#landing-page">Home</Link>
        <Link href="/#category">Categories</Link>
        <Link href="/#about">About Us</Link>
        <Link href="/#testimonials">Testimonials</Link>
        <Link href="/#contact">Contact Us</Link>
      </div>
    </dialog>
  );
};

export default forwardRef<HTMLDialogElement, unknown>(Nav);
