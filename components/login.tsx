import React, { type RefObject, type Ref, forwardRef } from "react";
import Link from "next/link";
// import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { GiCancel } from "react-icons/gi";

const Login = (_: unknown, passedRef: Ref<HTMLDialogElement>) => {
  // interface User {
  //   name: string;
  //   image: string;
  //   password: string;
  //   email: string;
  // }
  // const [user, setUser] = useState({});
  const onLoginSuccess = (credentialResponse: any) => {
    const data = (jwtDecode(credentialResponse?.credential ?? "") ?? {}) as Record<string, any>;
    fetch(process.env.NEXT_PUBLIC_WEB_ENDPOINT + "/api/check-email/" + Buffer.from(data.email).toString("base64")).then(
      (tempData) => {
        tempData.json().then((finalData) => {
          // eslint-disable-next-line no-console
          console.log(finalData);
        });
      }
    );
  };
  const ref = passedRef as RefObject<HTMLDialogElement>;
  const closeHandler = () => {
    if (ref.current) {
      ref.current.close();
    }
  };
  return (
    <dialog className="register" ref={ref}>
      <div className="options">
        <button title="cancel login" onClick={closeHandler}>
          <GiCancel />
        </button>
        <div className={"login  act"}>Sign-In / Sign-Up</div>
      </div>
      <form className="login">
        <label htmlFor="mail" className="mail">
          E-mail:
        </label>
        <input type="email" id="mail" placeholder="E-mail" name="mail" />
        <label htmlFor="password" className="password">
          Password :
        </label>
        <input type="password" id="password" placeholder="Password" name="passowrd" />
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
            // eslint-disable-next-line no-console
            console.log("Login Failed");
          }}
        />
      </form>
    </dialog>
  );
};
export default forwardRef<HTMLDialogElement, unknown>(Login);
