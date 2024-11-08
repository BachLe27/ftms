type Capability = {
  serviceId: number;
  Service: {
    serviceName: string;
  };
};

type Address = {
  address: {
    districtId: number;
  };
};

type MapAddress = {
  mapAddress: {
    lat: number;
    lng: number;
  };
};

type StaffType = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string;
  password: string;
  dob: Date;
  phone: string;
  gender: string;
  credibility: string;
  roleId: string;
  status: boolean;
  capabilities: Capability[];
  addresses: Address[];
  Schedule: any[]; // Define the properties of Schedule according to your database schema
  maps: MapAddress[];
  distance: number;
};

export type StaffListProps = {
  id: string
  staffName: string;
  staffAvatar: string;
  staffGender: string;
  phone: string;
  credibility: string;
  address: string;
  distance?: string;
}


export type StaffDataType = Staff[];

