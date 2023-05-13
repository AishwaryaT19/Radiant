import { useContext } from "react";
import { AppContext, type AppContextType } from "../provider/app-context";

export function useGetUser() {
  return useContext(AppContext).user.state;
}

export function useSetUser() {
  const setCartFun = useContext(AppContext).user.setState;
  const setterFunction = (prop: AppContextType["user"]["state"]) => {
    setCartFun(prop);
  };
  return setterFunction;
}

export function useUser() {
  const user = useGetUser();
  const setUser = useSetUser();
  const forReturn: [AppContextType["user"]["state"], (prop: AppContextType["user"]["state"]) => void] = [user, setUser];
  return forReturn;
}
