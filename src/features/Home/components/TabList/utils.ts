import type { TabDTO } from '@/state-management/tabs';
import type { TabCardData } from '../TabCard';
import { CURRENCY_SYMBOLS } from './constants';

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

export function formatClosedDate(closedAt: string): string {
  return new Date(closedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function formatTotal(
  items: TabDTO['items'],
  currencyCode: string,
): string {
  const total = items.reduce((sum, item) => sum + parseFloat(item.amount), 0);
  const symbol = CURRENCY_SYMBOLS[currencyCode] ?? currencyCode;
  return `${symbol}${total.toFixed(2)}`;
}

export function toCardData(tab: TabDTO, userId: string | null): TabCardData {
  const isActive = tab.closedAt === null;
  return {
    id: tab.id,
    title: tab.title,
    venue: tab.venue ?? '',
    status: isActive ? 'active' : 'closed',
    role: tab.createdById === userId ? 'host' : 'guest',
    duration: isActive ? formatDuration(tab.createdAt) : undefined,
    date: !isActive ? formatClosedDate(tab.closedAt!) : undefined,
    memberCount: tab.members.length,
    totalAmount: formatTotal(tab.items, tab.currencyCode),
  };
}
