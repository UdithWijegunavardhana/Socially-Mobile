import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, RegisterScreen, OTPScreen } from '../screens'
import Dashboard from './../screens/Dashboard'

const Stack = createStackNavigator()
const AuthNavigator = () => (
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
      name="Dashboard"
      component={Dashboard}
      options={{ title: 'Home' }}
    />
  </Stack.Navigator>
)

export default AuthNavigator
