import { Buffer } from "buffer";

export const parseJwt = (token: string) => {
  if (!token) return "";
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};
