import React, { ReactNode, useState, Dispatch, SetStateAction, createContext, RefObject } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
  phoneNumber: number;
  address: {
    buildingDetails: string;
    street: string;
    landmark: string;
    pincode: number;
    city: string;
    state: string;
  };
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
  const [loginModal, setLoginModal] = useState<RefObject<HTMLDialogElement>>(appContextInit.loginModalRef.state);
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
      state: loginModal,
      setState: setLoginModal
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
      <AppContext.Provider value={contextProviderValue}>{props.children}</AppContext.Provider>
    </GoogleOAuthProvider>
  );
}
