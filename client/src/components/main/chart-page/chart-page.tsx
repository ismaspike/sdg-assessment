import { useEffect, useMemo, useState } from 'react';
import { useDataListContext } from '../../../context';
import { IChartPageProps } from './chart-page.types';
import { IItemsDataAdapted } from '../../../types/service.types';
import BarChart from '../../common/bar-chart/bar-chart';
import { adaptItemsDataToBarChart } from '../../../utils/functions';
import CustomButton from '../../common/custom-button/custom-button';
import CustomRangeInput from '../../common/custom-range-input/custom-range-input';
import { IOnChangeEventProps } from '../../common/custom-range-input/custom-range-input.types';
import ErrorPage from '../error-page/error-page';
import Loader from '../../common/loader/loader';

const ChartPage = (props: IChartPageProps) => {
  const {
    fetchContinentsList,
    fetchCountriesList,
    continentsList,
    countriesList,
    loading,
    error
  } = useDataListContext();
  const { continent } = props;
  const [populationBounds, setPopulationBounds] = useState<IOnChangeEventProps>(
    { min: 0, max: 0 }
  );
  const [reloadRangeInput, setReloadRangeInput] = useState<number>(0);

  const [populationFilters, setPopulationFilters] =
    useState<IOnChangeEventProps>({ min: 0, max: 0 });

  useEffect(() => {
    if (continent) {
      if (!countriesList[continent]) {
        fetchCountriesList(continent.toLowerCase());
      }
    } else {
      fetchContinentsList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continent]);

  useEffect(() => {
    if (checkIfPageLoaded()) {
      handleReloadRangeInput();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const checkIfPageLoaded = () => {
    return Boolean(
      continent ? countriesList[continent.toLowerCase()] : continentsList.length
    );
  };

  const handleRangeInputHasChanged = (data: IOnChangeEventProps) => {
    setPopulationFilters(data);
  };

  const handleReloadRangeInput = () => {
    const items: IItemsDataAdapted[] = continent
      ? countriesList[continent.toLowerCase()]
      : continentsList;

    const minValue = items.reduce(
      (acc, cur) => (cur.population < acc.population ? cur : acc),
      items[0] || undefined
    ).population;
    const maxValue = items.reduce(
      (acc, cur) => (cur.population > acc.population ? cur : acc),
      items[0] || undefined
    ).population;

    setPopulationBounds({
      min: minValue,
      max: maxValue
    });
    setPopulationFilters({
      min: minValue,
      max: maxValue
    });
    setReloadRangeInput(reloadRangeInput + 1);
  };

  const filteredItems = useMemo(() => {
    if (!checkIfPageLoaded()) {
      return [];
    }
    const data = continent ? countriesList[continent] : continentsList;
    return data.filter(
      (item) =>
        item.population >= populationFilters.min &&
        item.population <= populationFilters.max
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continent, countriesList, continentsList, populationFilters]);

  return (
    <div className="chart-page">
      <h1 className={`chart-page__title${error ? ' --dnone' : ''}`}>
        Population chart of{' '}
        {continent ? (
          <span className="--capitalize">{continent}</span>
        ) : (
          'the continents'
        )}
      </h1>
      {loading ? (
        <div className="chart-page__loader">
          <Loader />
        </div>
      ) : Boolean(checkIfPageLoaded()) ? (
        <>
          <div className="chart-page__bar-chart">
            <BarChart data={adaptItemsDataToBarChart(filteredItems)}></BarChart>
          </div>
          <div className="chart-page__custom-range-input">
            <CustomRangeInput
              max={populationBounds.max}
              min={populationBounds.min}
              onChange={handleRangeInputHasChanged}
              reload={reloadRangeInput}
            />
          </div>
          <div className="chart-page__custom-button">
            <CustomButton
              onButtonPressed={handleReloadRangeInput}
              type="white"
              text="RELOAD RANGE"
              disabled={false}
              testId="continue-shopping-button"
            />
          </div>
        </>
      ) : (
        <ErrorPage
          errorTitle={error}
          errorSubtitle={`Error while loading ${continent ? `${continent} countries` : 'continents'}`}
          recallAction={continent ? fetchCountriesList : fetchContinentsList}
          recallParams={continent ? continent : undefined}
        />
      )}
    </div>
  );
};

export default ChartPage;
