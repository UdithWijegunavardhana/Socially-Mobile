import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import OTPTextView from 'react-native-otp-textinput'
import Background from '../components/Background'
import { theme } from '../core/theme'
import { AuthContext } from '../helpers/Utils'
import {API} from '../navigation/host'
import Apptext from '../components/AppText'

export default function OTPScreen({ route, navigation }) {
  const [otpInput, setOtpInput] = useState('')
  const [err, setErr] = useState('')
  const [isOtpSent,setIsOtpSent] = useState()

  const { phoneNumber } = route.params
  const { signIn } = React.useContext(AuthContext)

  function onLoginPressed() {
    signIn({ phoneNumber, otpInput })
  } 

  function resentOtp(){
    var axios = require('axios')
    var data = JSON.stringify({
      phoneNumber: phoneNumber,
    })

    var config = {
      method: 'post',
      url:API.host+'auth/phone',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        let IsOtpSend = JSON.stringify(response.data.IsOtpSend)
        if(IsOtpSend){
          setIsOtpSent('Otp Sent Your Mobile Number')
        }
        console.log('OTP send : ' + IsOtpSend)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.instructions}>Verify Your Phone</Text>
        <Text style={styles.textInputContainer}>
          Please enter the 6 digit code sent to
        </Text>
        <Text style={{ fontSize: 15 }}>{phoneNumber}</Text>

        <OTPTextView
          containerStyle={styles.textInputContainer}
          handleTextChange={(text) => setOtpInput(text)}
          inputCount={6}
          keyboardType="default"
        />
        <Text style={styles.errMessage}>{err}</Text>
        {isOtpSent && <Apptext style={{backgroundColor:'rgba(18, 62, 166,0.3)', padding:5, borderRadius:3}}>{isOtpSent}</Apptext>}
        <View style={styles.buttonWrapper}>
          <Text style={styles.textNearButton}> Didn't receive a code ? </Text>
          <PaperButton style={styles.buttonStyle} mode="text" uppercase={false} onPress={resentOtp}>
            Resend OTP
          </PaperButton>
        </View>
        <TouchableOpacity>
          <PaperButton
            mode="contained"
            onPress={onLoginPressed}
            uppercase={true}
            style={styles.verifyButton}
            labelStyle={{ color: 'white', marginTop: 13 }}
          >
            Verify
          </PaperButton>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginBottom: 30,
  },
  instructions: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
  },
  textInputContainer: {
    marginBottom: 10,
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
    width: 280,
    height: 43,
  },
  wrongNumButton: {
    width: '80%',
    marginTop: 20,
  },
  errMessage: {
    color: theme.colors.error,
  },
})
