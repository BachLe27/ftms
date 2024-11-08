
interface Service {
  id: number;
  serviceName: string;
  promotionImg: string;
}

interface ServiceCombo {
  title: string;
  description: string;
}
interface DataItem {
  id: number;
  service: Service;
  serviceCombo: ServiceCombo;
  date: string; // ISO date string
  address: string;
  status: string;
  amount: number
}


export type RecentlyRequestType = DataItem;

