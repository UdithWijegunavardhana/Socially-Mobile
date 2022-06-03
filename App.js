import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { theme } from './src/core/theme'
import AuthNavigator from './src/navigation/AuthNavigator'
import AppNavigator from './src/navigation/AppNavigator'

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <AuthNavigator />
        {/* <AppNavigator /> */}
      </NavigationContainer>
    </Provider>
  )
}
