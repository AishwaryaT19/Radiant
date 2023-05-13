import React, { ReactNode, useState, Dispatch, SetStateAction, createContext } from "react";
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
  imageUrl: string;
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
}
const appContextInit: AppContextType = {
  cart: {
    state: {},
    setState: () => ({})
  },
  user: {
    state: undefined,
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

  const contextProviderValue: AppContextType = {
    cart: {
      state: cart,
      setState: setCart
    },
    user: {
      state: user,
      setState: setUser
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
      <AppContext.Provider value={contextProviderValue}>{props.children}</AppContext.Provider>
    </GoogleOAuthProvider>
  );
}
