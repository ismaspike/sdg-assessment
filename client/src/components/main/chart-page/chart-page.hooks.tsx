import { useEffect, useMemo, useState } from 'react';
import { ICountriesListType } from '../../../types/context.types';
import { IItemsDataAdapted } from '../../../types/service.types';
import { IOnChangeEventProps } from '../../common/custom-range-input/custom-range-input.types';
import { useDataListContext } from '../../../context';

export const useChartPageHooks = (props: {
  fetchCountriesList: (region: string) => Promise<void>;
  fetchContinentsList: () => Promise<void>;
  continent: string;
  loading: boolean;
}): {
  populationBounds: IOnChangeEventProps;
  reloadRangeInput: number;
  populationFilters: IOnChangeEventProps;
  filteredItems: IItemsDataAdapted[];
  handleReloadRangeInput: () => void;
  handleRangeInputHasChanged: (data: IOnChangeEventProps) => void;
  checkIfPageLoaded: () => boolean;
} => {
  const { fetchCountriesList, fetchContinentsList, continent, loading } = props;
  const { countriesList, continentsList } = useDataListContext();
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
      if (!continentsList.length) {
        fetchContinentsList();
      }
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
    if (items) {
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
    }
  };

  useEffect(() => {
    if (!loading) {
      handleReloadRangeInput();
    }
  }, [continent]);

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

  return {
    filteredItems,
    handleReloadRangeInput,
    handleRangeInputHasChanged,
    checkIfPageLoaded,
    populationFilters,
    populationBounds,
    reloadRangeInput
  };
};
