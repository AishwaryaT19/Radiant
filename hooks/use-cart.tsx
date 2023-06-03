import { useContext } from "react";
import { AppContext } from "../provider/app-context";
import type { AppContextType } from "../provider/app-context";

export function useGetCart() {
  return useContext(AppContext).cart.state;
}

export function useSetCart() {
  const setCartFun = useContext(AppContext).cart.setState;
  return setCartFun;
}

export function useCart() {
  type StateType = AppContextType["cart"]["state"];
  type SetStateType = AppContextType["cart"]["setState"];
  const cart: StateType = useGetCart();
  const setCart: SetStateType = useSetCart();
  const forReturn: [StateType, SetStateType] = [cart, setCart];
  return forReturn;
}
