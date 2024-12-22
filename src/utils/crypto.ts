import CryptoJS from 'crypto-js';

export function createHash(data: string): string {
  return CryptoJS.SHA256(data).toString();
}

export function generateRandomBytes(length: number): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}