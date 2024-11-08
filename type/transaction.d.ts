export type TransactionType = {
  id: number;
  service: Service;
  serviceCombo: ServiceCombo;
  date: string; 
  address: string;
  status: string;
  amount: number
  userName: string
  userAvatar: string
}


export type TransactionColumnType = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  date: string;
  amount: number
  status: string
}

const RecentTransactionDataSample = {
  "id": "1",
  "service": {
    "id": "1",
    "serviceName": "Công việc 1",
    "promotionImg": "https://picsum.photos/200/300"
  },
  "serviceCombo": {
    "title": "Tối đa 60m2",
    "description": "1  phòng"
  },
  "date": "2021-10-01T00:00:00.000Z",
  "address": "57 ngõ 88 Mễ Trì Hạ",
  "status": "complete",
  "userName": "Joe Smith",
  "userAvatar": "https://picsum.photos/200/300",
  "amount": 1000000,
},

export type RecentlyTransactionType = typeof RecentTransactionDataSample



export type TransactionDetail = {
  transactionId: string;
  transactionDate: string;
  amount: number;
  status: string;
  transactionType: string;
  serviceName: string;
  customerName: string;
  address: string;
  phoneNumber: string;
  customerAvatar: string

}
