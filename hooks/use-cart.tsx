import { useContext } from "react";
import { AppContext, type AppContextType } from "../provider/app-context";

export function useGetCart() {
  return useContext(AppContext)[0].cart;
}

export function useSetCart() {
  const setAllContext = useContext(AppContext)[1];
  const setterFunction = (prop: AppContextType["cart"]) => {
    setAllContext((previousContext) => {
      return { ...previousContext, cart: prop };
    });
  };
  return setterFunction;
}

export function useCart() {
  const cart = useGetCart();
  const setCart = useSetCart();
  const forReturn: [
    AppContextType["cart"],
    (prop: AppContextType["cart"]) => void
  ] = [cart, setCart];
  return forReturn;
}
