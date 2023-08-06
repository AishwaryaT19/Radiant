import { customAlphabet } from "nanoid";
const getId = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-", 10);
export default getId;
