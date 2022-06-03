import React, { useState, useRef, useEffect, Component } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import OTPTextView from 'react-native-otp-textinput'
import Background from '../components/Background'
import { theme } from '../core/theme'

export default function OTPScreen({ route, navigation }) {
  const [otpInput, setOtpInput] = useState('')
  const [err, setErr] = useState('')

  const { phoneNumber } = route.params

  const handleOtpVerify = () => {
    var axios = require('axios')
    var data = JSON.stringify({
      phoneNumber: phoneNumber,
      otp: otpInput,
    })

    var config = {
      method: 'post',
      url: 'http://localhost:3000/auth/otp',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        let responseNumber = response.data.phoneNumber
        let isNewUser = response.data.isNewUser
        console.log(isNewUser)
        if (responseNumber) {
          if (isNewUser === true) {
            navigation.navigate('RegisterScreen', {
              phoneNumber: phoneNumber,
            })
          } else {
            // navigation.navigate('ViewAdsScreen')
            console.log('navigate to ads screen')
          }
        }
      })
      .catch(function (error) {
        setErr(error)
      })
  }

  // const clear = () => {
  //   this.input1.clear()
  // }
  // const updateOtpText = () => {
  //   this.input1.setValue(this.state.inputText)
  // }

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.instructions}>Verify Your Phone</Text>
        <Text style={styles.textInputContainer}>
          Please enter the 6 digit code sent to
        </Text>
        <Text>{phoneNumber}</Text>

        <OTPTextView
          containerStyle={styles.textInputContainer}
          handleTextChange={(text) => setOtpInput(text)}
          inputCount={6}
          keyboardType="default"
        />
        <Text style={styles.errMessage}>{err}</Text>
        <TouchableOpacity>
          <PaperButton
            mode="outlined"
            onPress={handleOtpVerify}
            uppercase={false}
          >
            Verify
          </PaperButton>
        </TouchableOpacity>

        <View style={styles.buttonWrapper}>
          <Text style={styles.textNearButton}> Didn't receive a code ? </Text>
          <PaperButton style={styles.buttonStyle} mode="text" uppercase={false}>
            Resend OTP
          </PaperButton>
        </View>
      </View>
    </Background>
  )
}
// export default function verify({ navigation }) {
//   const { phoneNumber } = route.params
//   return (
//     <Background>
//       <OTPScreen />
//       <PaperButton
//         style={styles.wrongNumButton}
//         mode="text"
//         uppercase={false}
//         onPress={() => navigation.navigate('LoginScreen')}
//         // onPress={() =>
//         //   navigation.reset({
//         //     index: 0,
//         //     routes: [{ name: 'LoginScreen' }],
//         //   })
//         // }
//       >
//         Wrong number
//         {phoneNumber}
//       </PaperButton>
//       <PaperButton
//         style={styles.verifyButton}
//         mode="contained"
//         // onPress={() => navigation.navigate('Dashboard')}
//         // onPress={() =>
//         //   navigation.reset({
//         //     index: 0,
//         //     routes: [{ name: 'Dashboard' }],
//         //   })
//         // }
//       >
//         Continue
//       </PaperButton>
//     </Background>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  instructions: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    alignItems: 'center',
  },
  buttonStyle: {
    width: '48%',
  },
  textNearButton: {
    fontSize: 14,
  },
  verifyButton: {
    marginTop: 20,
    width: '85%',
  },
  wrongNumButton: {
    width: '80%',
    marginTop: 20,
  },
  errMessage: {
    color: theme.colors.error,
  },
})
