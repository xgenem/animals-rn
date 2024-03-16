import React, {createContext, useEffect, useMemo, useState} from 'react';
import {Animal} from '../models/animals';

type Props = {
  animals: Animal[];
  loading: boolean;
};

export const AnimalContext = createContext<Props>({
  animals: [],
  loading: false,
});

export const AnimalsProvider = ({...rest}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch('https://animalgallery.danielb.codes/entry/')
      .then(response => response.json())
      .then(json => setAnimals(json.entries))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      animals,
      loading,
    }),
    [animals, loading],
  );
  return <AnimalContext.Provider value={value} {...rest} />;
};

export const useAnimals = () => {
  const context = React.useContext(AnimalContext);
  if (context === undefined) {
    throw new Error('useAnimals must be used within an AnimalsProvider');
  }
  return context;
};
