import React, { useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { CardField, useStripe } from '@stripe/stripe-react-native'
import { StripeProvider } from '@stripe/stripe-react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { theme } from '../core/theme'
import { Button } from 'react-native-paper'

function App() {
  return (
    <StripeProvider
      publishableKey="pk_test_51JvHR3ID7bnBPNMMnJhLGQ6iIb4CSwUPc6YYB0ZDbs6qq32QX3h9TE4X6CeBGNAUtq73gWuXYCTm40GPUdHwIO4E00Eg2iQWf6"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      // Your app code here
    </StripeProvider>
  )
}

const PaymentsScreen = ({ navigation }) => {
  const { paymentIntent, ephemeralKey, customer } = useStripe()
  const [loading, setLoading] = useState(false)

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams()

    const { error } = await initPaymentSheet({
      customerId: ephemeralKey.customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    })

    if (error) {
      Alert.alert(error.message)
    }
  }

  const presentPaymentSheet = async () => {
    setLoading(true)
    const { error } = await presentPaymentSheet()
    if (error) {
      Alert.alert(error.message)
    }
    setLoading(false)
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Image
          source={require('../assets/DebitCard4.png')}
          style={styles.cardImage}
        />
      </View>
      <View style={{ backgroundColor: 'white' }}>
        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={styles.cardField}
          onCardChange={(cardDetails) => {
            console.log('cardDetails', cardDetails)
          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField)
          }}
        />
        <Button
          mode="contained"
          uppercase={true}
          height={48}
          width={'85%'}
          marginBottom={70}
          alignSelf={'center'}
          // disabled={!loading}
          labelStyle={styles.labelStyle}
          onPress={() => alert('Payment in Progress')}
        >
          Confirm
        </Button>
      </View>
    </SafeAreaProvider>
  )
}

export default PaymentsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  cardImage: {
    width: '130%',
    height: '68%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  cardField: {
    width: '85%',
    height: 50,
    marginBottom: 35,
    alignSelf: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 5,
  },
  labelStyle: {
    fontSize: 17,
    alignSelf: 'center',
    marginTop: 13,
  },
})
