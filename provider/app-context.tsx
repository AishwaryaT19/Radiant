import React, { ReactNode, useState, Dispatch, SetStateAction } from "react";
import { createContext } from "react";
interface CartType {
  name: string;
  price: number;
  sale: boolean;
  saleprice: number;
  url: string;
  numberOfItems: number;
}
export interface AppContextType {
  cart: Record<string, CartType>;
}
const appContextInit: AppContextType = {
  cart: {},
};
export const AppContext = createContext<
  [AppContextType, Dispatch<SetStateAction<AppContextType>>]
>([appContextInit, () => appContextInit]);

interface ProviderProps {
  children: ReactNode;
}
export default function AC(props: ProviderProps) {
  const [contextState, setcontextState] =
    useState<AppContextType>(appContextInit);
  return (
    <AppContext.Provider value={[contextState, setcontextState]}>
      {props.children}
    </AppContext.Provider>
  );
}
