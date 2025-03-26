import { useEffect, useState } from 'react';
import { useDataListContext } from '../../../context';

const Continents = () => {
  const { fetchContinentsList, loading } = useDataListContext();
  useEffect(() => {
    fetchContinentsList();
  }, []);

  return <div className="continents">It works!</div>;
};

export default Continents;
