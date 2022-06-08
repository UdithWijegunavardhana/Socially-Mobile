import React, { useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { CardField, useStripe , useConfirmPayment } from '@stripe/stripe-react-native'
import { StripeProvider } from '@stripe/stripe-react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { theme } from '../core/theme'
import { Button, Switch } from 'react-native-paper'
import Apptext from '../components/AppText'
import TextInput from '../components/TextInput'

function App() {
  return (
    <StripeProvider
      publishableKey="pk_test_51JvHR3ID7bnBPNMMnJhLGQ6iIb4CSwUPc6YYB0ZDbs6qq32QX3h9TE4X6CeBGNAUtq73gWuXYCTm40GPUdHwIO4E00Eg2iQWf6"
      urlScheme="your-url-scheme" 
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" 
    >
    </StripeProvider>
  )
}

const PaymentsScreen = ({ navigation }) => {

  const {confirmPayment, loading} = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'usd',
      }),
    });
    const {clientSecret} = await response.json();

    return clientSecret;
  };

  const handlePayPress = async () => {
    const billingDetails = {
      email: 'jenny.rosen@example.com',
    };

    const clientSecret = await fetchPaymentIntentClientSecret();

    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log('Payment confirmation error', error);
    } else if (paymentIntent) {
      console.log('Success from promise', paymentIntent);
    }
  };

  
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Image
          source={require('../assets/DebitCard5.png')}
          style={styles.cardImage}
        />
        <View style={styles.amountSection}>
          <Apptext style={styles.text}>Amount </Apptext>
          <View style={{ flexDirection: 'row' }}>
            <Apptext children="US$" style={styles.amount} />
            <Apptext children=" 230.00" style={styles.amount} />
          </View>
        </View>
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
        <TextInput
          label="Card Holder"
          autoCorrect={false}
          style={styles.input}
        />
        <Button
          mode="contained"
          uppercase={true}
          height={45}
          width={'85%'}
          marginBottom={70}
          alignSelf={'center'}
          labelStyle={styles.labelStyle}
          onPress={handlePayPress}
          disabled={loading}
        >
          Confirm
        </Button>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  cardImage: {
    width: '113%',
    height: '50%',
    marginTop: '3%',
    resizeMode: 'contain',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 50 },
  },
  cardField: {
    width: '85%',
    height: 45,
    marginBottom: 20,
    alignSelf: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 5,
  },
  labelStyle: {
    fontSize: 17,
    alignSelf: 'center',
    marginTop: 13,
  },
  amount: {
    fontSize: 30,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  amountSection: {
    marginLeft: '7.5%',
  },
  text: {
    fontSize: 17,
    color: theme.colors.mediumGrey,
  },
  input: {
    width: '85%',
    alignSelf: 'center',
    borderColor: theme.colors.primary,
    height: 44,
    marginBottom: 20,
  },
})

export default PaymentsScreen
