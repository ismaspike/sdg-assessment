import { useEffect, useState } from 'react';
import { useDataListContext } from '../../../context';
import { IChartPageProps } from './chart-page.types';
import { IItemsDataAdapted } from '../../../types/service.types';

const ChartPage = (props: IChartPageProps) => {
  const {
    fetchContinentsList,
    fetchCountriesList,
    continentsList,
    countriesList,
    loading
  } = useDataListContext();
  const { continent } = props;

  useEffect(() => {
    if (continent) {
      fetchCountriesList(continent.toLowerCase());
    } else {
      fetchContinentsList();
    }
  }, [continent]);

  const chartRender = (data: IItemsDataAdapted[]) => (
    <ul>
      {data.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <div className="chart-page">
      <h3>Population chart of {continent || 'all the continents'}</h3>
      {loading ? (
        <div>Loader</div>
      ) : (
        chartRender(continent ? countriesList : continentsList)
      )}
    </div>
  );
};

export default ChartPage;
