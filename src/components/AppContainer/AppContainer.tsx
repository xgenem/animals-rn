import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {Colors} from '../../theme/colors';
import {AnimalsProvider} from '../../context/Animals';

const AppContainer: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <SafeAreaProvider>
      <AnimalsProvider>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <View
              style={[
                styles.appContainer,
                {
                  paddingTop: insets?.top || 20,
                  paddingBottom: insets?.bottom || 20,
                },
              ]}>
              {children}
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
      </AnimalsProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default AppContainer;
