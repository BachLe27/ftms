
export type DistrictType = {
  "code": number,
  "message": string,
  "data": [{
    "DistrictID": string,
    "ProvinceID": string,
    "DistrictName": string
  }
  ]
}

export type ProvinceType = {
  "code": number,
  "message": string,
  "data": [{
    "ProvinceID": string,
    "ProvinceName": string
  }
  ]
}
export type WardType = {
  "code": number,
  "message": string,
  "data": [{
    "WardCode": string,
    "DistrictID": string,
    "WardName": string
  }
  ]
}

export type MapType = {
  "addressText": string,
  "latitude": number,
  "longitude": number,
  "mapLink": string
}

export type AddressType = {
  id?: string,
  provinceId: number,
  districtId: number,
  wardId: number,
  userId: string,
  specificAddress: string

}

export type MapType = {
  addressText: string,
  mapLink: string,
  userId: string,
  latitude: number,
  longitude: number
}

export type LocationType = {
  longitude: number,
  latitude: number
}
