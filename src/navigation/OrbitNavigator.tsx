import React from 'react';
import { Image, Platform, StyleSheet, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AtlasScreen from '../screens/AtlasScreen';
import SpotlightScreen from '../screens/SpotlightScreen';
import DriftScreen from '../screens/DriftScreen';
import GridlineScreen from '../screens/GridlineScreen';
import PulseScreen from '../screens/PulseScreen';
import EchoScreen from '../screens/EchoScreen';
import HarborScreen from '../screens/HarborScreen';

import type { OrbitTabParamList, AtlasStackParamList } from './types';

const Tab = createBottomTabNavigator<OrbitTabParamList>();
const AtlasStack = createNativeStackNavigator<AtlasStackParamList>();

function AtlasStackNavigator() {
  return (
    <AtlasStack.Navigator screenOptions={{ headerShown: false }}>
      <AtlasStack.Screen name="AtlasHome" component={AtlasScreen} />
      <AtlasStack.Screen name="Spotlight" component={SpotlightScreen} />
    </AtlasStack.Navigator>
  );
}

const icons = {
  atlas: require('../assets/icons/tab_atlas.png'),
  drift: require('../assets/icons/tab_drift.png'),
  gridline: require('../assets/icons/tab_gridline.png'),
  pulse: require('../assets/icons/tab_pulse.png'),
  echo: require('../assets/icons/tab_echo.png'),
  harbor: require('../assets/icons/tab_harbor.png'),
};

type TabIconProps = {
  focused: boolean;
  source: any;
  size: number;
};

function TabIcon({ focused, source, size }: TabIconProps) {
  return (
    <Image
      source={source}
      resizeMode="contain"
      style={[
        {
          width: size,
          height: size,
        },
        focused ? styles.tabIconActive : styles.tabIconInactive,
      ]}
    />
  );
}

export default function OrbitNavigator() {
  const { width, height } = useWindowDimensions();

  const isVerySmall = height <= 680;
  const isSmall = height <= 760;
  const isNarrow = width <= 360;
  const isVeryNarrow = width <= 340;

  const horizontalInset = isVeryNarrow ? 10 : isNarrow ? 12 : 16;

  const tabBarHeight = Platform.OS === 'ios'
    ? (isVerySmall ? 68 : isSmall ? 72 : 78)
    : (isVerySmall ? 64 : isSmall ? 68 : 74);

  const tabBarBottom = Platform.OS === 'ios'
    ? (isVerySmall ? 14 : 20)
    : (isVerySmall ? 22 : 30);

  const tabBarRadius = isVerySmall ? 26 : 32;

  const iconSize = isVerySmall ? 20 : isSmall ? 22 : 24;

  const itemPaddingTop = isVerySmall ? 4 : 6;

  const paddingTop = isVerySmall ? 6 : 8;
  const paddingBottom = Platform.OS === 'ios'
    ? (isVerySmall ? 6 : 8)
    : (isVerySmall ? 8 : 10);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: 'absolute',
          left: horizontalInset,
          right: horizontalInset,
          bottom: tabBarBottom,
          height: tabBarHeight,
          borderRadius: tabBarRadius,
          backgroundColor: '#B58477',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.18,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          paddingTop,
          paddingBottom,
        },

        tabBarItemStyle: {
          paddingTop: itemPaddingTop,
        },

        sceneStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Tab.Screen
        name="Atlas"
        component={AtlasStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.atlas} size={iconSize} />
          ),
        }}
      />

      <Tab.Screen
        name="Drift"
        component={DriftScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.drift} size={iconSize} />
          ),
        }}
      />

      <Tab.Screen
        name="Gridline"
        component={GridlineScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.gridline} size={iconSize} />
          ),
        }}
      />

      <Tab.Screen
        name="Pulse"
        component={PulseScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.pulse} size={iconSize} />
          ),
        }}
      />

      <Tab.Screen
        name="Echo"
        component={EchoScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.echo} size={iconSize} />
          ),
        }}
      />

      <Tab.Screen
        name="Harbor"
        component={HarborScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.harbor} size={iconSize} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIconActive: {
    tintColor: '#F5E9DF',
    opacity: 1,
  },

  tabIconInactive: {
    tintColor: '#3E0C16',
    opacity: 1,
  },
});