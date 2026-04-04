export interface TabMemberDTO {
  tabId: string;
  userId: string;
}

export interface TabMenuItemDTO {
  id: string;
  tabId: string;
  name: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

export interface TabItemDTO {
  id: string;
  tabId: string;
  label: string;
  amount: string;
  paidById: string;
  createdAt: string;
  updatedAt: string;
}

export interface TabParticipantDTO {
  id: string;
  tabId: string;
  userId: string;
  createdAt: string;
}

export interface TabSettlementDTO {
  id: string;
  tabId: string;
  payerId: string;
  payeeId: string;
  amount: string;
  createdAt: string;
}

export interface TabDTO {
  id: string;
  title: string;
  venue: string | null;
  currencyCode: string;
  currencyName: string;
  notes: string | null;
  createdById: string;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
  items: TabItemDTO[];
  participants: TabParticipantDTO[];
  settlements: TabSettlementDTO[];
  members: TabMemberDTO[];
  menuItems: TabMenuItemDTO[];
}
