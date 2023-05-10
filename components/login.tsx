import React from "react";
import Link from "next/link";
// import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import gqlclient from "@/gql/client";
import { checkForEmail } from "@/gql/queries";

export default function Login() {
  // const [isLoginSel, setIsLoginSel] = useState<boolean>(true);
  // const condRendLog = () => {
  //   setIsLoginSel(true);
  // };
  // const condRendSign = () => {
  //   setIsLoginSel(false);
  // };
  interface User {
    name: string;
    image: string;
    password: string;
    email: string;
  }

  const [user, setUser] = useState({});
  const onLoginSuccess = (credentialResponse: any) => {
    let data = (jwt_decode(credentialResponse?.credential ?? "") ??
      {}) as Record<string, any>;
    fetch(
      process.env.NEXT_PUBLIC_WEB_ENDPOINT +
        "/api/check-email/" +
        Buffer.from(data.email).toString("base64")
    ).then((tempData) => {
      tempData.json().then((finalData) => {
        console.log(finalData);
      });
    });
  };
  return (
    <div className="register">
      <div className="options">
        <Link href="/cart">
          <GiCancel />
        </Link>
        <button
          className={"login  act"}
          // onClick={condRendLog}
        >
          Sign-In / Sign-Up
        </button>
        {/* <button
          className={"signup " + (!isLoginSel ? "act" : "inac")}
          onClick={condRendSign}
        >
          Sign-Up
        </button> */}
      </div>
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
        <span>or Sign-in / Sign up with Google</span>
        <GoogleLogin
          theme="filled_black"
          shape="pill"
          logo_alignment="center"
          onSuccess={onLoginSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </form>

      {/* <form className="sign-up">
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
          <GoogleLogin
            theme="filled_black"
            shape="pill"
            logo_alignment="center"
            text="signup_with"
            onSuccess={(credentialResponse) => {
              console.log(jwt_decode(credentialResponse.credential ?? ""));
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </form>
       */}
    </div>
  );
}
