import { useEffect, useState } from 'react';
import { useDataListContext } from '../../../context';
import { IChartPageProps } from './chart-page.types';
import { IItemsDataAdapted } from '../../../types/service.types';
import BarChart from '../../common/bar-chart/bar-chart';
import { adaptItemsDataToBarChart } from '../../../utils/functions';
import CustomButton from '../../common/custom-button/custom-button';
import CustomRangeInput from '../../common/custom-range-input/custom-range-input';

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
      if (!countriesList[continent]) {
        fetchCountriesList(continent.toLowerCase());
      }
    } else {
      fetchContinentsList();
    }
  }, [continent]);

  useEffect(() => {
    console.log(countriesList);
  }, [countriesList]);

  return (
    <div className="chart-page">
      <h3>Population chart of {continent || 'all the continents'}</h3>
      {loading ? (
        <div>Loader</div>
      ) : Boolean(
          continent ? countriesList[continent.toLowerCase()] : continentsList
        ) ? (
        <BarChart
          data={adaptItemsDataToBarChart(
            continent ? countriesList[continent] : continentsList
          )}
        ></BarChart>
      ) : (
        <></>
      )}
      <CustomRangeInput max={5000} min={20} onChange={() => {}} />
    </div>
  );
};

export default ChartPage;
