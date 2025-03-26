import {
  ICountryByRegionResponse,
  ICountryResponse,
  IItemsDataAdapted
} from '../types/service.types';

export const adaptContinentsList = (
  data: ICountryResponse[]
): IItemsDataAdapted[] => {
  const dataReturn: IItemsDataAdapted[] = [];
  data.forEach((item) => {
    const dataIndex = dataReturn.findIndex(
      (region) => region.name === item.region
    );
    if (dataIndex === -1) {
      dataReturn.push({
        name: item.region,
        population: item.population
      });
    } else {
      dataReturn[dataIndex] = {
        ...dataReturn[dataIndex],
        population: item.population + dataReturn[dataIndex]
      };
    }
  });
  return dataReturn;
};

export const adaptCountriesList = (
  data: ICountryByRegionResponse[]
): IItemsDataAdapted[] => {
  return data.map((item) => {
    return {
      name: `${item.flag} ${item.name.common}`,
      population: item.population
    };
  });
};
