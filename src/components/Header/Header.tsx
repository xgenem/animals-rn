import React, {useMemo, useState} from 'react';
import {
  ActionSheetIOS,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../theme/colors';
import Icon from '../Icon';
import {ms} from 'react-native-size-matters';
import {useAnimals} from '../../context/Animals';
import {Animal} from '../../models/animals';

type Props = {
  onSetFilters: (filter: string) => void;
};

export const Header: React.FC<Props> = ({onSetFilters}) => {
  const {animals} = useAnimals();
  const [filterName, setFilterName] = useState<string>('Animals');

  const filters = useMemo(() => {
    switch (filterName) {
      case 'Animals':
        return [...new Set(animals.map(animal => animal.animal))];
      case 'Colors':
        return [...new Set(animals.map(animal => animal.color))];
      case 'Categories':
        return [...new Set(animals.map(animal => animal.category))];
      case 'Flight':
        const _animals: Animal[] = [];
        animals.forEach(animal => {
          if (animal.canFly) {
            _animals.push(animal);
          }
        });
        return [...new Set(_animals.map(animal => animal.animal))];
    }
  }, [animals, filterName]);

  const onPressFilter = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Animals', 'Colors', 'Categories', 'Flight'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 1:
            setFilterName('Animals');
            onSetFilters('Animals');
            break;
          case 2:
            setFilterName('Colors');
            onSetFilters('Colors');
            break;
          case 3:
            setFilterName('Categories');
            onSetFilters('Categories');
            break;
          case 4:
            setFilterName('Flight');
            onSetFilters('Flight');
            break;
          default:
            break;
        }
      },
    );
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{filterName}</Text>

        <TouchableOpacity style={styles.groupByButton} onPress={onPressFilter}>
          <Icon name="home" color={Colors.text} size={ms(20)} />
          <Text style={styles.groupByText}>Group by</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal style={{marginVertical: ms(12)}}>
        {filters?.sort().map(filter => (
          <TouchableOpacity>
            <Text style={styles.filter}>
              {filter.charAt(0).toUpperCase() + filter.substring(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  filter: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '400',
    marginRight: ms(20),
  },
  groupByButton: {
    width: 126,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.outline,
    backgroundColor: Colors.buttonBg,
    flexDirection: 'row',
  },
  groupByText: {
    marginLeft: ms(10),
    color: Colors.text,
    fontSize: 14,
  },
});
