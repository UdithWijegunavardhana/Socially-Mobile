import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { theme } from './../core/theme'
import Button from '../components/Button'
import { Avatar, Divider } from 'react-native-paper'
import Icontext from '../components/IconText'
import Apptext from '../components/AppText'
import Icontextbutton from '../components/IconTextButton'
import { StripeProvider, useStripe, Alert } from '@stripe/stripe-react-native'
import { AuthContext } from '../helpers/Utils'

function Stripe() {
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

const Profilescreen = ({ navigation }) => {
  // const { initPaymentSheet, presentPaymentSheet } = useStripe()
  // const [loading, setLoading] = useState(false)

  // const fetchPaymentSheetParams = async () => {
  //   const response = await fetch(`${API_URL}/checkout`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   const { paymentIntent, ephemeralKey, customer } = await response.json()
  //   return {
  //     paymentIntent,
  //     ephemeralKey,
  //     customer,
  //   }
  // }

  // const initializePaymentSheet = async () => {
  //   const { paymentIntent, ephemeralKey, customer, publishableKey } =
  //     await fetchPaymentSheetParams()

  //   const { error } = await initPaymentSheet({
  //     customerId: ephemeralKey.customer,
  //     customerEphemeralKeySecret: ephemeralKey,
  //     paymentIntentClientSecret: paymentIntent,
  //     // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
  //     //methods that complete payment after a delay, like SEPA Debit and Sofort.
  //     allowsDelayedPaymentMethods: true,
  //   })
  //   if (!error) {
  //     setLoading(true)
  //   }
  // }

  // const openPaymentSheet = async () => {
  //   const { error } = await presentPaymentSheet()
  //   if (error) {
  //     console.log(`Error code: ${error.code}`, error.message)
  //   } else {
  //     console.log('Success', 'Your order is confirmed!')
  //   }
  // }

  // useEffect(() => {
  //   initializePaymentSheet()
  // }, [])

  const { signOut } = React.useContext(AuthContext)
  return (
    <SafeAreaView
      style={{ padding: 5, backgroundColor: theme.colors.white, flex: 1 }}
    >
      <View style={styles.userInfoSection}>
        <View style={styles.profileImageContainer}>
          <Avatar.Image size={127} source={require('../assets/avatar.jpg')} />
        </View>
        <View style={styles.userData}>
          <Apptext children="Jhone S. Mathew" style={styles.userName} />
          <Icontext
            name="phone"
            text="+94 72 2388 200"
            size={20}
            iconColor={theme.colors.medium}
            style={styles.iconText}
          />
          <Icontext
            name="map-marker"
            text="Sri Lanka"
            size={20}
            iconColor={theme.colors.medium}
            style={styles.iconText}
          />
        </View>
      </View>
      <Divider style={{ color: 'black' }} />
      <View style={styles.earningInfoSection}>
        <Icontext
          name="information-outline"
          text="Estimated Earnings"
          size={15}
          iconColor={theme.colors.medium}
          style={styles.iconText}
        />
        <View style={{ flexDirection: 'row' }}>
          <Apptext children="US$" style={styles.amount} />
          <Apptext children="230.00" style={styles.amount} />
        </View>
        <Button
          mode="contained"
          uppercase={false}
          // disabled={!loading}
          labelStyle={styles.labelStyle}
          onPress={() => navigation.navigate('Paymentsscreen')}
        >
          Withdraw
        </Button>
      </View>
      <View style={styles.navigationSection}>
        <Icontextbutton name="help-circle" title="Help" />
        <Icontextbutton
          name="bank-transfer"
          title="View Transactions"
          onPress={() => navigation.navigate('TransactionScreen')}
        />
        <Icontextbutton name="currency-usd-circle" title="My Earnings" />
        <Icontextbutton name="logout" title="Log Out" onPress={signOut} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  profileImageContainer: {
    padding: 5,
  },
  iconText: {
    color: theme.colors.medium,
    fontSize: 15,
    paddingHorizontal: 5,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
  },
  userData: {
    marginLeft: 20,
  },
  userInfoSection: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  earningInfoSection: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  navigationSection: {
    flex: 4,
    flexDirection: 'column',
    marginTop: '20%',
  },
  amount: {
    fontSize: 44,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  labelStyle: {
    fontSize: 17,
    fontWeight: '500',
  },
  navButton: {},
  navButtonsText: {
    fontSize: 17,
    color: theme.colors.dark,
  },
})

export default Profilescreen
