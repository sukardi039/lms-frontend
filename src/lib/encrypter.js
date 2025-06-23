/**
 * Encrypts a message using SHA-256 hashing algorithm and returns the hash as a hexadecimal string.
 *
 * @param {string} message - The input message to be hashed.
 * @returns {string} The SHA-256 hash of the message in hexadecimal format.
 */
import sjcl from "sjcl";

export function encrypter(message) {
  const myBitArray = sjcl.hash.sha256.hash(message);
  return sjcl.codec.hex.fromBits(myBitArray);
}
