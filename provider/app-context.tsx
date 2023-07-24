import React, { ReactNode, useState, useEffect, Dispatch, SetStateAction, createContext, RefObject } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { destroyCookie, parseCookies, setCookie } from "nookies";

export interface CartType {
  name: string;
  price: number;
  url: string;
  numberOfItems: number;
}
export interface UserType {
  name: string;
  email: string;
  image: string;
  phoneNumber: string;
  addressBuilding: string;
  addressCity: string;
  addressLandmark: string;
  addressPincode: number;
  addressState: string;
  addressStreet: string;
}

export interface AppContextType {
  cart: {
    state: Record<string, CartType>;
    setState: Dispatch<SetStateAction<Record<string, CartType>>>;
  };
  user: {
    state: UserType | undefined;
    setState: Dispatch<SetStateAction<UserType | undefined>>;
  };
  loginModalRef: {
    state: RefObject<HTMLDialogElement>;
    setState: Dispatch<SetStateAction<RefObject<HTMLDialogElement>>>;
  };
}
const appContextInit: AppContextType = {
  cart: {
    state: {},
    setState: () => ({})
  },
  user: {
    state: undefined,
    setState: () => undefined
  },
  loginModalRef: {
    state: undefined as unknown as RefObject<HTMLDialogElement>,
    setState: () => undefined
  }
};
export const AppContext = createContext<AppContextType>(appContextInit);

interface ProviderProps {
  children: ReactNode;
}

export default function AC(props: ProviderProps) {
  const [cart, setCart] = useState<Record<string, CartType>>(appContextInit.cart.state);
  const [user, setUser] = useState<UserType | undefined>(appContextInit.user.state);
  const [loginModalRef, setLoginModalRef] = useState<RefObject<HTMLDialogElement>>(appContextInit.loginModalRef.state);
  useEffect(() => {
    const cookies = parseCookies();
    const cookieUserStr = cookies?.user;
    if (cookieUserStr) {
      const cookieUserObj = JSON.parse(Buffer.from(cookieUserStr, "base64").toString("utf-8"));
      if (cookieUserObj?.name) {
        setUser(cookieUserObj);
        if (cookies?.cart) {
          const cookiesCartObj = JSON.parse(Buffer.from(cookies.cart, "base64").toString("utf-8"));
          setCart(cookiesCartObj);
        }
      }
    } else {
      destroyCookie(null, "user");
    }
  }, []);
  useEffect(() => {
    if (user) {
      setCookie(null, "user", Buffer.from(JSON.stringify(user)).toString("base64"), {
        maxAge: 6 * 60 * 60,
        path: "/"
      });
    }
  }, [user]);
  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      setCookie(null, "cart", Buffer.from(JSON.stringify(cart)).toString("base64"), {
        maxAge: 6 * 60 * 60
      });
    }
  }, [cart]);
  const contextProviderValue: AppContextType = {
    cart: {
      state: cart,
      setState: setCart
    },
    user: {
      state: user,
      setState: setUser
    },
    loginModalRef: {
      state: loginModalRef,
      setState: setLoginModalRef
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
      <AppContext.Provider value={contextProviderValue}>{props.children}</AppContext.Provider>
    </GoogleOAuthProvider>
  );
}
