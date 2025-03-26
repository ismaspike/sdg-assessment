import { createContext, useState, useContext, useEffect } from 'react';
import { IDataListContext } from './types/context.types';
import {
  ICountryByRegionResponse,
  ICountryResponse,
  IItemsDataAdapted
} from './types/service.types';
import { adaptContinentsList, adaptCountriesList } from './utils/functions';

// MOBILE LIST API CONTEXT
const DataListContext = createContext<IDataListContext>({
  continentsList: [],
  countriesList: [],
  loading: true,
  fetchContinentsList: undefined,
  fetchCountriesList: undefined
});

export const DataListProvider = ({ children }) => {
  const [continentsList, setContinentsList] = useState<IItemsDataAdapted[]>([]);
  const [countriesList, setCountriesList] = useState<IItemsDataAdapted[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchContinentsList = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/continents`);
      const data: ICountryResponse[] = await response.json();
      setContinentsList(adaptContinentsList(data));
    } catch (error) {
      console.error('Error fetching continents list:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountriesList = async (continent: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/countries?continent=${continent}`
      );
      const data: ICountryByRegionResponse[] = await response.json();
      setCountriesList(adaptCountriesList(data));
    } catch (error) {
      console.error('Error fetching countries list:', error);
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
        fetchCountriesList
      }}
    >
      {children}
    </DataListContext.Provider>
  );
};

export const useDataListContext = () => useContext(DataListContext);
