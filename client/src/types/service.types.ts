export interface ICountryResponse {
  region: string;
  population: number;
}

export interface ICountryByRegionResponse {
  name: {
    common: string;
  };
  population: number;
}

export interface IItemsDataAdapted {
  name: string;
  population: number;
}
