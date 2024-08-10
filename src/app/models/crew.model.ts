export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
}
export enum Title {
  Captain = 'Captain',
  Engineer = 'Engineer',
  Cooker = 'Cooker',
  Mechanicer = 'Mechanicer',
}

export interface Crew {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  title: string;
  daysOnBoard: number;
  dailyRate: number;
  currency: Currency; // Enum olarak tanımlandı
  totalIncome: number;
  certificates: string[];
  discount?: number;
}
