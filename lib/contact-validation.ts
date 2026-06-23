import { isValidPhoneNumber } from "libphonenumber-js";

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value: string): boolean {
  return Boolean(value.trim()) && isValidPhoneNumber(value);
}
