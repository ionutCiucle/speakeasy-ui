import type { TabDTO } from '@/state-management/tabs';
import type { OrderItem } from './types';

export function toItems(tab: TabDTO): OrderItem[] {
  const grouped = new Map<
    string,
    { id: string; name: string; quantity: number; unitPrice: number }
  >();

  for (const item of tab.items) {
    const existing = grouped.get(item.label);
    if (existing) {
      existing.quantity += 1;
    } else {
      grouped.set(item.label, {
        id: item.id,
        name: item.label,
        quantity: 1,
        unitPrice: parseFloat(item.amount),
      });
    }
  }

  return Array.from(grouped.values()).map(
    ({ id, name, quantity, unitPrice }) => ({
      id,
      name,
      quantity,
      price: unitPrice,
    }),
  );
}
