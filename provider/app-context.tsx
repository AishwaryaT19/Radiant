import React, { ReactNode, useState, Dispatch, SetStateAction, createContext } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

export interface CartType {
  name: string;
  price: number;
  url: string;
  numberOfItems: number;
}
export interface AppContextType {
  cart: Record<string, CartType>;
}
const appContextInit: AppContextType = {
  cart: {}
};
export const AppContext = createContext<[AppContextType, Dispatch<SetStateAction<AppContextType>>]>([
  appContextInit,
  () => appContextInit
]);

interface ProviderProps {
  children: ReactNode;
}

export default function AC(props: ProviderProps) {
  const [contextState, setcontextState] = useState<AppContextType>(appContextInit);
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
      <AppContext.Provider value={[contextState, setcontextState]}>{props.children}</AppContext.Provider>
    </GoogleOAuthProvider>
  );
}
