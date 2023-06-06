import { useContext } from "react";
import { AppContext, type AppContextType } from "../provider/app-context";

export function useGetLoginModal() {
  return useContext(AppContext).loginModalRef.state;
}

export function useSetLoginModal() {
  const setLoginContext = useContext(AppContext).loginModalRef.setState;
  const setterFunction = (prop: AppContextType["loginModalRef"]["state"]) => {
    setLoginContext(prop);
  };
  return setterFunction;
}

export function useLoginModal() {
  const loginModal = useGetLoginModal();
  const setLoginModal = useSetLoginModal();
  const forReturn: [
    AppContextType["loginModalRef"]["state"],
    (prop: AppContextType["loginModalRef"]["state"]) => void
  ] = [loginModal, setLoginModal];
  return forReturn;
}
