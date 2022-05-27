import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ViewAdsScreen from '../screens/ViewAdsScreen'
import { IconButton } from 'react-native-paper'
import ProfileScreen from './../screens/ProfileScreen'
import Editprofilescreen from '../screens/EditProfileScreen'

const Stack = createStackNavigator()
const AppStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
        shadowColor: '#fff',
        elevation: 0,
      },
    }}
  >
    <Stack.Screen
      name="ViewAdsScreen"
      component={ViewAdsScreen}
      options={({ navigation }) => ({
        title: 'Advertisements',
        headerRight: () => (
          <IconButton
            icon="account"
            onPress={() => navigation.navigate('ProfileScreen')}
          />
        ),
      })}
    />
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={({ navigation }) => ({
        title: 'My Account',
        headerRight: () => (
          <IconButton
            icon="account-edit"
            onPress={() => navigation.navigate('Editprofilescreen')}
          />
        ),
      })}
    />
    <Stack.Screen
      name="Editprofilescreen"
      component={Editprofilescreen}
      options={({ navigation }) => ({
        title: 'Edit Account',
      })}
    />
  </Stack.Navigator>
)
export default AppStack
