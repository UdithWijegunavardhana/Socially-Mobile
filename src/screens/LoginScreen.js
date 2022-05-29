import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Background from '../components/Background'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { phoneNumberValidator } from '../helpers/PhoneNumberValidator'

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const phoneNumberError = phoneNumberValidator(phoneNumber.value)
    if (phoneNumberError) {
      setPhoneNumber({ ...phoneNumber, error: phoneNumberError })
      return
    }
    //API connection
    var axios = require('axios')
    var data = JSON.stringify({
      phoneNumber: phoneNumber.value,
    })

    var config = {
      method: 'post',
      url: 'http://localhost:3000/auth/phone',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        let IsOtpSend = JSON.stringify(response.data.IsOtpSend)
        console.log(IsOtpSend)
        navigation.navigate('OTPScreen', {
          screen: 'OTPScreen',
          IsOtpSend: IsOtpSend,
          params : { phoneNumber: phoneNumber.value }
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <Background>
      <TextInput
        label="Phone"
        returnKeyType="done"
        value={phoneNumber.value}
        onChangeText={(text) => setPhoneNumber({ value: text, error: '' })}
        error={!!phoneNumber.error}
        errorText={phoneNumber.error}
        keyboardType="numeric"
      />

      <Button mode="contained" onPress={onLoginPressed}>
        Get OTP
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
