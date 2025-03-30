import { createContext, useState, useContext } from 'react';
import { ICountriesListType, IDataListContext } from './types/context.types';
import {
  ICountryByRegionResponse,
  ICountryResponse,
  IItemsDataAdapted
} from './types/service.types';
import { adaptContinentsList, adaptCountriesList } from './utils/functions';

// Continents / countries list context
const DataListContext = createContext<IDataListContext>({
  continentsList: [],
  countriesList: {},
  loading: true,
  fetchContinentsList: undefined,
  fetchCountriesList: undefined,
  error: ''
});

export const DataListProvider = ({ children }) => {
  const [continentsList, setContinentsList] = useState<IItemsDataAdapted[]>([]);
  const [countriesList, setCountriesList] = useState<ICountriesListType>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchContinentsList = async () => {
    try {
      setError('');
      setLoading(true);
      const response = await fetch(`http://localhost:3001/continents`);
      const data: ICountryResponse[] = await response.json();
      setContinentsList(adaptContinentsList(data));
    } catch (error) {
      setError(error?.message || 'Error while loading continents');
    } finally {
      setLoading(false);
    }
  };

  const fetchCountriesList = async (continent: string) => {
    try {
      setError('');
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/countries?continent=${continent}`
      );
      const data: ICountryByRegionResponse[] = await response.json();
      setCountriesList({
        ...countriesList,
        [continent]: adaptCountriesList(data)
      });
    } catch (error) {
      setError(error?.message || 'Error while loading countries');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataListContext.Provider
      value={{
        continentsList,
        countriesList,
        loading,
        fetchContinentsList,
        fetchCountriesList,
        error
      }}
    >
      {children}
    </DataListContext.Provider>
  );
};

export const useDataListContext = () => useContext(DataListContext);
