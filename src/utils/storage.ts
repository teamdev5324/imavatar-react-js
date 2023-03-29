import { decrypt, encrypt } from '../crypto';

export function setSessionItem(key: string, value: any): void {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function setLocalItem(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem(key: string): any {
  const value = sessionStorage.getItem(key) || undefined;
  const localValue = localStorage.getItem(key) || undefined;

  if (value) {
    return JSON.parse(decrypt(value)) as any;
  }
  if (localValue) {
    // console.log(JSON.parse(decrypt(localValue)));
    return localValue;
  }
  return null;
}

export function deleteItem(key: string) {
  sessionStorage.removeItem(key);
}

export function clear() {
  sessionStorage.clear();
}
