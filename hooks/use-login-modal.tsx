import { useContext } from "react";
import { AppContext, type AppContextType } from "../provider/app-context";

export function useGetLoginModal() {
  return useContext(AppContext).loginModalRef.state;
}

export function useSetLoginModal() {
  const setLoginContext = useContext(AppContext).loginModalRef.setState;
  return setLoginContext;
}

export function useLoginModal() {
  const loginModal = useGetLoginModal();
  const setLoginModal = useSetLoginModal();
  const forReturn: [AppContextType["loginModalRef"]["state"], AppContextType["loginModalRef"]["setState"]] = [
    loginModal,
    setLoginModal
  ];
  return forReturn;
}
