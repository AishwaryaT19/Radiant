import { createClient } from "contentful-management";
const client = createClient({
  accessToken: process?.env?.CONTENTFUL_ACCESS_TOKEN ?? "",
  space: process?.env?.CONTENTFUL_SPACE ?? ""
});
export default client;
