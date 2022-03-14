export type TransactionType = 'save' | 'redeem' | 'creation';

export interface HistoryItemProps {
  id: string;
  pocketId: string;
  value: number;
  date: Date;
  type: TransactionType;
}

export interface PocketProps {
  id: string;
  value: number;
  name: string;
  goal: number;
}
