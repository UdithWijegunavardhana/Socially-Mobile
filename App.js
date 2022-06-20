import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { theme } from './src/core/theme'
import AuthNavigator from './src/navigation/AuthNavigator'
import { StripeProvider } from '@stripe/stripe-react-native'

export default function App() {
  return (
    <StripeProvider
      publishableKey="pk_test_51JvHR3ID7bnBPNMMnJhLGQ6iIb4CSwUPc6YYB0ZDbs6qq32QX3h9TE4X6CeBGNAUtq73gWuXYCTm40GPUdHwIO4E00Eg2iQWf6"
      urlScheme="your-url-scheme"
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}"
    >
      <Provider theme={theme}>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  )
}
