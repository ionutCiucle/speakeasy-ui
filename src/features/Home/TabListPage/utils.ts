import type { TabDTO } from '@/state-management/tabs';
import { formatDuration, formatTotal } from '@/utils';
import type { TabCardData } from '../components/TabCard';

export { formatDuration, formatTotal };

export function formatClosedDate(closedAt: string): string {
  return new Date(closedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
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
