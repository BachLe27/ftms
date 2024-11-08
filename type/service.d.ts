export type ServiceType = {
  id: string,
  serviceName: string,
  shortDescription: string,
  ServiceCombo: ServiceComboType[]
}

export type ServiceComboType = {
  id: string,
  title: string,
  description: string,
  price: number,
  duration: number,
  staffNumber: number
}

