import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, RegisterScreen, OTPScreen } from '../screens'
import ViewAdsScreen from '../screens/ViewAdsScreen'

const Stack = createStackNavigator()
const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="LoginScreen"
    screenOptions={{
      headerShown: true,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ title: 'Socially' }}
    />
    <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{ title: 'Register' }}
    />
    <Stack.Screen
      name="OTPScreen"
      component={OTPScreen}
      options={{ title: 'OTP' }}
    />
    <Stack.Screen
      name="ViewAdsScreen"
      component={ViewAdsScreen}
      options={{ title: 'Ads' }}
    />
  </Stack.Navigator>
)

export default AuthStack
