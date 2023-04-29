import { useContext } from "react";
import { AppContext, type AppContextType } from "../provider/app-context";

export function useAppContext() {
  return useContext(AppContext)[0];
}

export function useSetAppContext() {
  const setContext = useContext(AppContext)[1];
  const setterFunction = (prop: AppContextType) => {
    setContext(prop);
  };
  return setterFunction;
}
