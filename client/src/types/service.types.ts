export interface ICountryResponse {
  region: string;
  population: string;
}

export interface ICountryByRegionResponse {
  name: {
    common: string;
  };
  population: string;
  flag: string;
}

export interface IItemsDataAdapted {
  name: string;
  population: string;
}
