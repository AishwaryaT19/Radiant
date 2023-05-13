import { useContext } from "react";
import { AppContext } from "../provider/app-context";

export function useAppContext() {
  return useContext(AppContext);
}
