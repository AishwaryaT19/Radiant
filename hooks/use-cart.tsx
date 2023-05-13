import { useContext } from "react";
import { AppContext, type AppContextType } from "../provider/app-context";

export function useGetCart() {
  return useContext(AppContext).cart.state;
}

export function useSetCart() {
  const setCartFun = useContext(AppContext).cart.setState;
  const setterFunction = (prop: AppContextType["cart"]["state"]) => {
    setCartFun(prop);
  };
  return setterFunction;
}

export function useCart() {
  const cart = useGetCart();
  const setCart = useSetCart();
  const forReturn: [AppContextType["cart"]["state"], (prop: AppContextType["cart"]["state"]) => void] = [cart, setCart];
  return forReturn;
}
