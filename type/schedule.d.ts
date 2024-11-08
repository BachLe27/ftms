export type ScheduleInputType = {
  id: string;
  user: {
    avatar: string;
    name: string
    id?: string;
  },
  address: string;
  serviceCombo: string;
  serviceComboTitle: string;
  date: Date;
  googleMapLink?: string;
  startTime: string;
  endTime: string;
  phone: string
}
