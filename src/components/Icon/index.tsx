import React from 'react';
import {StyleProp, TextStyle, View} from 'react-native';
import Filters from '../../assets/icons/Filters.svg';
import {ms} from 'react-native-size-matters';

export type SVGIconName = 'filters' | 'home';

const icons = new Map();
icons.set('filters', Filters);
icons.set('home', Filters);

type Props = {
  size?: number;
  name?: SVGIconName;
  color?: string;
  style?: StyleProp<TextStyle>;
};
const defaultWidth = 30;

export default function Icon({name, size, style}: Props) {
  const IconObject = icons.get(name);
  if (IconObject) {
    return (
      <IconObject
        height={ms(size ?? defaultWidth)}
        width={ms(size ?? defaultWidth)}
        style={style}
      />
    );
  }
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        height: ms(size ?? defaultWidth),
        width: ms(size ?? defaultWidth),
        backgroundColor: 'red',
      }}
    />
  );
}
