import React, { type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCartFill, BsFillPersonFill } from "react-icons/bs";
import { useGetCart } from "@/hooks/use-cart";
import { useGetUser } from "@/hooks/use-user";
import { companyName } from "@/modules/home/text";

export interface RefType {
  loginRef: RefObject<HTMLDialogElement>;
  navRef: RefObject<HTMLDialogElement>;
}

export default function Header({ loginRef, navRef }: RefType) {
  const cart = useGetCart();
  const user = useGetUser();
  const totItems = Object.values(cart).reduce((noi, nextitem) => noi + nextitem.numberOfItems, 0);
  const loginButtonHandler = () => {
    if (loginRef.current) {
      loginRef.current.showModal();
    }
  };
  const navButtonHandler = () => {
    if (navRef.current) {
      navRef.current.showModal();
    }
  };
  return (
    <header id="header">
      <div className="main-logo">
        <Link href="/">{companyName}</Link>
      </div>
      <nav className="navigation">
        <Link href="/cart" className="cart">
          <BsCartFill />
          {totItems > 0 && <span>{totItems}</span>}
        </Link>
        <button title="login button" onClick={loginButtonHandler}>
          {user === undefined ? (
            <BsFillPersonFill />
          ) : (
            <div className="img-container">
              <Image src={user?.image ?? "/logo.png"} sizes="100%" alt={user.name} fill />
            </div>
          )}
        </button>
        <button className="burger" onClick={navButtonHandler}>
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="line-3"></div>
        </button>
      </nav>
    </header>
  );
}
