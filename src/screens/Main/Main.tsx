import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../theme/colors';
import {Header} from '../../components/Header/Header';
import {AnimalList} from '../../components/AnimalList';
import {useAnimals} from '../../context/Animals';
import {groupByAnimal} from '../../helpers/groupByAnimals';
import {groupByColor} from '../../helpers/groupByColor';
import {groupByCategory} from '../../helpers/groupByCategory';
import {groupByFlight} from '../../helpers/groupByFlight';

const Main = () => {
  const {animals} = useAnimals();
  const [filterName, setFilterName] = useState<string>('Animals');

  const displayAnimals = useMemo(() => {
    switch (filterName) {
      case 'Animals':
        return groupByAnimal(animals);
      case 'Colors':
        return groupByColor(animals);
      case 'Categories':
        return groupByCategory(animals);
      case 'Flight':
        return groupByFlight(animals);
    }
    return [];
  }, [animals, filterName]);

  const onSetFilters = (filter: string) => {
    setFilterName(filter);
  };

  return (
    <View style={styles.container}>
      <Header onSetFilters={onSetFilters} />
      <AnimalList animals={displayAnimals} filterName={filterName} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
});

export default Main;
