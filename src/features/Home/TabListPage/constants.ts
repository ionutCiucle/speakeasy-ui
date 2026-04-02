import { TabFilter } from './enums';

export const FILTERS: { key: TabFilter; label: string }[] = [
  { key: TabFilter.All, label: 'All' },
  { key: TabFilter.Owned, label: 'Owned' },
  { key: TabFilter.Joined, label: 'Joined' },
];
