import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCsrfToken(): string {
  if (typeof document === "undefined") return ""
  const match = document.cookie.match(/(?:^|;\s*)shopby_csrf=([^;]*)/)
  return match ? match[1] : ""
}

export function formatPrice(price: number): string {
  return `Rp${price.toLocaleString("id-ID")}`
}

export const NUMBER_RANGE_CHUNK_SIZE = 100

export function buildNumberRanges(total: number): { label: string; from: number; to: number }[] {
  const ranges: { label: string; from: number; to: number }[] = []
  for (let from = 1; from <= total; from += NUMBER_RANGE_CHUNK_SIZE) {
    const to = Math.min(from + NUMBER_RANGE_CHUNK_SIZE - 1, total)
    ranges.push({ label: `#${from}-${to}`, from, to })
  }
  return ranges
}
