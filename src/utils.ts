export function toInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

import { CurrencySymbol } from '@/enums';

export function formatDuration(createdAt: string): string {
  const minutes = Math.floor(
    (Date.now() - new Date(createdAt).getTime()) / 60000,
  );
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining === 0 ? `${hours}h` : `${hours}h ${remaining}m`;
}

export function formatTotal(
  items: { amount: string }[],
  currencyCode: string,
): string {
  const total = items.reduce((sum, item) => sum + parseFloat(item.amount), 0);
  const symbol =
    CurrencySymbol[currencyCode as keyof typeof CurrencySymbol] ?? currencyCode;
  return `${symbol}${total.toFixed(2)}`;
}
