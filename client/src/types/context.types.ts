import { IItemsDataAdapted } from './service.types';

export interface IDataListContext {
  continentsList: IItemsDataAdapted[];
  countriesList: IItemsDataAdapted[];
  loading: boolean;
  fetchContinentsList: () => Promise<void>;
  fetchCountriesList: (region: string) => Promise<void>;
}
