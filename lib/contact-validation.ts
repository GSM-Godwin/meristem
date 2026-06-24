import { isValidPhoneNumber } from "libphonenumber-js";

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidName(value: string): boolean {
  return value.trim().length >= 2;
}

export function isValidPhone(value: string): boolean {
  return Boolean(value.trim()) && isValidPhoneNumber(value);
}
