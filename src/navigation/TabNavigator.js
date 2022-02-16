import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Dashboard from './../screens/Dashboard'
import ViewAdsScreen from './../screens/ViewAdsScreen'
import Advertisersscreen from './../screens/AdvertisersScreen'
import Paymentsscreen from './../screens/PaymentsScreen'
import { theme } from './../core/theme'

const Tab = createBottomTabNavigator()

const TabNavigator = () => (
  <Tab.Navigator tabBarOptions={{ activeTintColor: theme.colors.primary }}>
    <Tab.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        title: 'Home',
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="ViewAdsScreen"
      component={ViewAdsScreen}
      options={{
        title: 'Ads',
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="newspaper-variant-outline"
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Advertisersscreen"
      component={Advertisersscreen}
      options={{
        title: 'Advertisers',
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="account-tie"
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Paymentsscreen"
      component={Paymentsscreen}
      options={{
        title: 'Payments',
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="cash-usd" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
)

export default TabNavigator
