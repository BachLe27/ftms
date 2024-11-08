export type UserAddresses = {
  addresses: {
    address: {
      province: {
        id: number;
        provinceName: string;
      };
      district: {
        id: number;
        districtName: string;
      };
      ward: {
        id: number;
        wardName: string;
      };
      id: string;
      specificAddress: string;
      isDefault: boolean;
    };
  }[];
}

