import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// eslint-disable-next-line import/prefer-default-export
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatGbp = new Intl.NumberFormat('en-UK', {
  style: 'currency',
  currency: 'GBP',
})
