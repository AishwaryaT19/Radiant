import { companyName } from "@/modules/home/text";
import Link from "next/link";
import React, { type RefObject } from "react";
import { BsSearchHeart, BsCartFill, BsFillPersonFill } from "react-icons/bs";
import { useGetCart } from "@/hooks/use-cart";

export default function Header({
  loginRef,
}: {
  loginRef: RefObject<HTMLDialogElement>;
}) {
  const cart = useGetCart();
  const totItems = Object.values(cart).reduce(
    (noi, nextitem) => noi + nextitem.numberOfItems,
    0
  );
  const loginButtonHandler = () => {
    if (loginRef.current) {
      loginRef.current.showModal();
    }
  };
  return (
    <header id="header">
      <div className="searches">
        <Link href="/">{companyName}</Link>
        <div className="search">
          <BsSearchHeart />
          <input type="text" placeholder="Search.." name="search" />
        </div>
      </div>
      <nav className="navigation">
        <Link href="/cart" className="cart">
          <BsCartFill />
          {totItems > 0 && <span>{totItems}</span>}
        </Link>
        <button title="login button" onClick={loginButtonHandler}>
          <BsFillPersonFill />
        </button>
        <div className="burger">
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="line-3"></div>
        </div>
      </nav>
    </header>
  );
}
