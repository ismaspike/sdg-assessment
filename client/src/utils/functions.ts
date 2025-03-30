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
        population: item.population + dataReturn[dataIndex].population
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
      name: `${item.name.common}`,
      population: item.population
    };
  });
};

export const adaptItemsDataToBarChart = (itemsData: IItemsDataAdapted[]) => {
  const labels: string[] = [];
  const data: number[] = [];
  itemsData.forEach((item) => {
    labels.push(item.name);
    data.push(item.population);
  });
  return {
    labels,
    datasets: [
      {
        data,
        label: 'Population',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };
};

export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
