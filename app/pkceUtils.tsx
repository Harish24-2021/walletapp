import * as Crypto from 'expo-crypto';

export const generateCodeVerifier = () => {
  const randomBytes = Crypto.getRandomBytes(32);
  const base64 = bufferToBase64(randomBytes);
  const verifier = base64URLEncode(base64);
  return verifier;
};

export const generateCodeChallenge = async (codeVerifier: string) => {
  const hashed = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    codeVerifier,
    { encoding: Crypto.CryptoEncoding.BASE64 }
  );
  return base64URLClean(hashed);
};

const base64URLClean = (base64: string) => {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

function base64URLEncode(str: string) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function bufferToBase64(buffer: Uint8Array) {
  return btoa(String.fromCharCode(...buffer));
}
