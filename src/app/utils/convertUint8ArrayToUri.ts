import { ImageURISource } from "react-native";

export const convertUint8ArrayToUri = async (image: Uint8Array) => {
  let binary = "";
  const len = image.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(image[i]);
  }

  const base64String = btoa(binary);

  return `data:image/jpeg;base64,${base64String}` as ImageURISource;
};
