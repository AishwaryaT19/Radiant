import React, { type RefObject, type Ref, forwardRef, useState, FormEventHandler, useEffect, useRef } from "react";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { GiCancel } from "react-icons/gi";
import { useSetLoginModal } from "@/hooks/use-login-modal";
import { useUser } from "@/hooks/use-user";
import type { UserType } from "@/provider/app-context";

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
  const [user, setUser] = useUser();
  const [googleUser, setGoogleUser] = useState<GoogleUserType>();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const setLoginModalRef = useSetLoginModal();
  const ref = passedRef as RefObject<HTMLDialogElement>;
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setLoginModalRef(ref);
  }, [ref, setLoginModalRef]);
  const onLoginSuccess = (credentialResponse: any) => {
    const data = (jwtDecode(credentialResponse?.credential ?? "") ?? {}) as GoogleUserType;
    setGoogleUser(data);
    const postUrl = "/api/check-email/";
    const email = Buffer.from(data.email).toString("base64");
    axios
      .post(postUrl, { email: email })
      .then((res) => {
        setUser(res.data[0]);
        closeHandler();
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setIsRegister(true);
        } else {
          alert("Something went wrong");
        }
      });
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
      phoneNumber: (target[2]?.value ?? "91") + (target[3]?.value ?? "9748488739"),
      addressBuilding: target[4]?.value ?? "",
      addressCity: target[7]?.value ?? "",
      addressLandmark: target[6]?.value ?? "",
      addressStreet: target[5]?.value ?? "",
      addressPincode: Number(target[8]?.value ?? 700023),
      addressState: target[9]?.value ?? ""
    };
    axios
      .post("/api/create-user", newUser)
      .then((res) => {
        if (res.status === 200) {
          setIsRegister(false);
          setUser(newUser);
          closeHandler();
        }
      })
      .catch(() => {
        onLoginFailure();
      });
  };
  const onLogOut = () => {
    const x = window.confirm("Are You Sure?");
    if (x) {
      setUser(undefined);
    }
    ref.current?.close();
  };
  const ManualLoginHandler = () => {
    if (emailRef.current && passwordRef.current) {
      const extractedEmail: string = emailRef.current.value;
      const extractedPassword: string = passwordRef.current.value;
      const checkingObject = {
        email: extractedEmail,
        password: extractedPassword
      };
      const credString = JSON.stringify(checkingObject);
      const credentials = Buffer.from(credString).toString("base64");
      const toSend = {
        credentials: credentials
      };
      const postUrl = "/api/check-creds";
      axios
        .post(postUrl, toSend)
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data);
            setIsRegister(false);
            ref.current?.close();
          }
        })
        .catch(() => {
          onLoginFailure();
        });
    }
  };
  return user ? (
    <dialog className="logout" ref={ref}>
      <button onClick={onLogOut}>LogOut</button>
      <button onClick={closeHandler}>close</button>
    </dialog>
  ) : (
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
          <input type="email" id="mail" placeholder="E-mail" name="mail" ref={emailRef} required />
          <label htmlFor="password" className="password">
            Password :
          </label>
          <input type="password" id="password" placeholder="Password" name="passowrd" ref={passwordRef} required />
          <div className="op">
            <input type="checkbox" id="rem" name="rem" />
            <label htmlFor="rem">Remember Me</label>
            <Link href="/" className="fp">
              Forgot Password
            </Link>
          </div>
          <button type="submit" title="submit" onClick={ManualLoginHandler}>
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
