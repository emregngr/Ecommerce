import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {EcomProvider} from './EcomProvider';
import {theme} from '../utils/theme';

export const Providers = ({children}) => {
  return (
    <EcomProvider>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </PaperProvider>
    </EcomProvider>
  );
};
