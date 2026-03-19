import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DawnScreen from '../screens/DawnScreen';
import PreludeScreen from '../screens/PreludeScreen';
import OrbitNavigator from './OrbitNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dawn" component={DawnScreen} />
      <Stack.Screen name="Prelude" component={PreludeScreen} />
      <Stack.Screen name="Orbit" component={OrbitNavigator} />
    </Stack.Navigator>
  );
}