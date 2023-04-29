import React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { GiCancel } from "react-icons/gi";

export default function Login() {
  const [isLoginSel, setIsLoginSel] = useState<boolean>(true);
  const condRendLog = () => {
    setIsLoginSel(true);
  };
  const condRendSign = () => {
    setIsLoginSel(false);
  };
  return (
    <div className="register">
      <Link href="/">
        <GiCancel />
      </Link>
      <div className="options">
        <button className="login" onClick={condRendLog}>
          Sign-In
        </button>
        <button className="signup" onClick={condRendSign}>
          Sign-Up
        </button>
      </div>
      {isLoginSel && (
        <form className="login">
          <label htmlFor="mail" className="mail">
            E-mail:
          </label>
          <input type="email" id="mail" placeholder="E-mail" name="mail" />
          <label htmlFor="password" className="password">
            Password :
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="passowrd"
          />
          <div className="op">
            <input type="checkbox" id="rem" name="rem" />
            <label htmlFor="rem">Remember Me</label>
            <Link href="/" className="fp">
              Forgot Password
            </Link>
          </div>
          <button type="submit" title="submit">
            Sign-in
          </button>
          <span>or</span>
          <button type="submit" title="google">
            <FcGoogle />
            Sign-in with google
          </button>
        </form>
      )}
      {!isLoginSel && (
        <form className="sign-up">
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" name="name" placeholder="Name" />
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" placeholder="E-mail" name="email" />
          <label htmlFor="pass">Password :</label>
          <input type="password" id="pass" placeholder="Password" />
          <button type="submit" title="submit">
            Sign-up
          </button>
          <span>or</span>
          <button type="submit" title="google">
            <FcGoogle />
            Sign-Up with google
          </button>
        </form>
      )}
    </div>
  );
}
