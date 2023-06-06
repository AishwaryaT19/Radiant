import React, { type RefObject, type Ref, forwardRef, useState, FormEventHandler, useEffect } from "react";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { GiCancel } from "react-icons/gi";
import { useSetUser } from "@/hooks/use-user";
import type { UserType } from "@/provider/app-context";
import { useSetLoginModal } from "@/hooks/use-login-modal";

interface GoogleUserType {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}
const Login = (_: unknown, passedRef: Ref<HTMLDialogElement>) => {
  const setUser = useSetUser();
  const [googleUser, setGoogleUser] = useState<GoogleUserType>();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const setLoginModalRef = useSetLoginModal();
  const ref = passedRef as RefObject<HTMLDialogElement>;
  useEffect(() => {
    setLoginModalRef(ref);
  }, [ref, setLoginModalRef]);
  const onLoginSuccess = (credentialResponse: any) => {
    const data = (jwtDecode(credentialResponse?.credential ?? "") ?? {}) as GoogleUserType;
    setGoogleUser(data);
    fetch(process.env.NEXT_PUBLIC_WEB_ENDPOINT + "/api/check-email/" + Buffer.from(data.email).toString("base64")).then(
      (tempData) => {
        tempData.json().then((finalData: UserType[]) => {
          if (finalData.length > 0) {
            setUser(finalData[0]);
            ref?.current?.close();
          } else {
            setIsRegister(true);
          }
        });
      }
    );
  };
  const closeHandler = () => {
    if (ref.current) {
      ref.current.close();
    }
  };
  const onLoginFailure = () => {
    alert("Something went wrong");
    setIsRegister(false);
    closeHandler();
  };
  const onRegister: FormEventHandler = (event) => {
    event.preventDefault();
    const target = event.target as unknown as HTMLInputElement[];
    if (target[0]?.value !== target[1]?.value) {
      alert("Passwords don't match");
      return;
    }
    const pincodeRegex = /^[1-9]{1}[0-9]{5}$/gm;
    if (!target[8]?.value.match(pincodeRegex)) {
      alert("Pincode is invalid");
      return;
    }
    interface TempUser extends UserType {
      password: string;
    }
    const newUser: TempUser = {
      name: googleUser?.name ?? "User",
      email: googleUser?.email ?? "radiantbodyworkscandle@gmail.com",
      image: googleUser?.picture ?? "/logo.png",
      password: target[0]?.value ?? "",
      phoneNumber: Number(target[2]?.value ?? "91" + target[3]?.value ?? "9748488739"),
      address: {
        buildingDetails: target[4]?.value ?? "",
        city: target[7]?.value ?? "",
        landmark: target[6]?.value ?? "",
        street: target[5]?.value ?? "",
        pincode: Number(target[8]?.value ?? 700023),
        state: target[9]?.value ?? ""
      }
    };
    axios
      .post("/api/create-user", newUser)
      .then((res) => {
        if (res.status === 200) {
          setIsRegister(false);
          closeHandler();
        }
      })
      .catch(() => {
        onLoginFailure();
      });
  };
  return (
    <dialog className="register" ref={ref}>
      <div className="options">
        {isRegister ? (
          <></>
        ) : (
          <button title="cancel login" onClick={closeHandler}>
            <GiCancel />
          </button>
        )}
        <div className={"login  act"}>
          {isRegister ? `Welcome ${googleUser?.given_name ?? "User"}, please enter your details` : `Sign-In / Sign-Up`}
        </div>
      </div>
      {isRegister ? (
        <form className="signup" onSubmit={onRegister}>
          <label htmlFor="password" className="password">
            Password :
          </label>
          <input
            type="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            id="password"
            placeholder="Password"
            name="passowrd"
            required
          />
          <label htmlFor="conpassword" className="conpassword">
            Confirm Password :
          </label>
          <input
            type="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            id="conpassword"
            placeholder="Password"
            name="conpassowrd"
            required
          />
          <div className="number">
            <span>+</span>
            <label htmlFor="ccode">Country Code:</label>
            <input id="ccode" name="cc" placeholder="00" type="number" min="1" required defaultValue="91" />
            <label htmlFor="number">Phone Number:</label>
            <input
              type="tel"
              pattern="[1-9]{1}[0-9]{9}"
              id="number"
              name="number"
              placeholder="Phone Number"
              required
            />
          </div>
          <label htmlFor="flat">Flat/Building:</label>
          <input type="text" id="flat" name="flat" placeholder="Flat/Building" required />
          <label htmlFor="street">Street:</label>
          <input type="text" id="street" name="street" placeholder="Street" required />
          <label htmlFor="landmark">Landmark:</label>
          <input type="text" id="landmark" name="landmark" placeholder="landmark" required />
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" placeholder="city" required />
          <div className="location">
            <div className="loc">
              <label htmlFor="pincode">Pincode:</label>
              <input
                type="number"
                pattern="[1-9]{1}[0-9]{5}"
                id="pincode"
                name="pincode"
                placeholder="pincode"
                required
              />
            </div>
            <div className="loc">
              <label htmlFor="state">State:</label>
              <input type="text" id="state" name="state" placeholder="state" required />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
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
            onError={onLoginFailure}
          />
        </form>
      )}
    </dialog>
  );
};
export default forwardRef<HTMLDialogElement, unknown>(Login);
