import { useDataListContext } from '../../../context';
import { IChartPageProps } from './chart-page.types';
import BarChart from '../../common/bar-chart/bar-chart';
import { adaptItemsDataToBarChart, capitalize } from '../../../utils/functions';
import CustomButton from '../../common/custom-button/custom-button';
import CustomRangeInput from '../../common/custom-range-input/custom-range-input';
import ErrorPage from '../error-page/error-page';
import Loader from '../../common/loader/loader';
import { useChartPageHooks } from './chart-page.hooks';

const ChartPage = (props: IChartPageProps) => {
  const { error, loading, fetchContinentsList, fetchCountriesList } =
    useDataListContext();
  const { continent } = props;
  const {
    checkIfPageLoaded,
    filteredItems,
    populationBounds,
    handleRangeInputHasChanged,
    reloadRangeInput,
    handleReloadRangeInput
  } = useChartPageHooks({
    fetchContinentsList,
    fetchCountriesList,
    continent,
    loading
  });

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
          errorSubtitle={`Error while loading ${continent ? `${capitalize(continent)} countries` : 'continents'}`}
          recallAction={continent ? fetchCountriesList : fetchContinentsList}
          recallParams={continent ? continent : undefined}
        />
      )}
    </div>
  );
};

export default ChartPage;
