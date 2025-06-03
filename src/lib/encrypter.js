import sjcl from "sjcl";

export function encrypter(message) {
  const myBitArray = sjcl.hash.sha256.hash(message);
  return sjcl.codec.hex.fromBits(myBitArray);
}
