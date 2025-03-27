import { IItemsDataAdapted } from './service.types';

export interface ICountriesListType {
  [key: string]: IItemsDataAdapted[];
}

export interface IDataListContext {
  continentsList: IItemsDataAdapted[];
  countriesList: ICountriesListType;
  loading: boolean;
  fetchContinentsList: () => Promise<void>;
  fetchCountriesList: (region: string) => Promise<void>;
}
