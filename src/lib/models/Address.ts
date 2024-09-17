export interface AddressComponent {
  district: string;
  commune: string;
  province: string;
  name: string;
  address: string;
  formatted_address: string;
  location: Geolocation;
}

interface Geolocation {
  lat: number;
  lng: number;
}

export interface Address {
  districtName: string;
  communeName: string;
  provinceName: string;
  addressName: string;
  formattedAddressName: string;
  lat: number;
  lng: number;
}
