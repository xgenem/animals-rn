import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {Animal} from '../../models/animals';
import {Colors} from '../../theme/colors';
import {ms} from 'react-native-size-matters';

type Props = {
  animals: {
    title: string;
    animals: Animal[];
  }[];
  filterName: string;
};

const AnimalList: React.FC<Props> = ({animals, filterName}) => {
  const renderItem = ({item}: {item: {title: string; animals: Animal[]}}) => (
    <View>
      <Text style={styles.filterName}>{filterName.toUpperCase()}</Text>
      <Text style={styles.animalTitle}>{item.title}</Text>
      {item.animals.map(animal => (
        <>
          <View style={{height: ms(10)}} />
          <Image
            style={styles.image}
            source={{
              uri: `https://animalgallery.danielb.codes${animal.imageUrl}`,
            }}
            resizeMode="cover"
          />
          <View style={{height: ms(10)}} />
        </>
      ))}
    </View>
  );

  const renderSeparator = () => (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        height: 2,
        backgroundColor: Colors.buttonBg,
        marginVertical: ms(20),
      }}
    />
  );

  return (
    <FlatList
      data={animals}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10,
  },
  filterName: {
    color: Colors.disabledText,
    fontSize: 12,
    fontWeight: '300',
    lineHeight: 16,
    letterSpacing: 2,
  },
  animalTitle: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
});

export default React.memo(AnimalList);
