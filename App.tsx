// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { COLORS } from './src/constants/theme';

export default function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <HomeScreen />
    </>
  );
}
