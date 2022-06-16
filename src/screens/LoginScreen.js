import React, { useState } from 'react'
import { StyleSheet, Image, Text } from 'react-native'
import Background from '../components/Background'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { phoneNumberValidator } from '../helpers/PhoneNumberValidator'
import { AuthContext } from '../helpers/Utils'

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
        console.log('OTP send : '+IsOtpSend)
        navigation.navigate('OTPScreen', {
          // screen: 'OTPScreen',
          IsOtpSend: IsOtpSend,
          phoneNumber: phoneNumber.value,
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <Background>
      <Text></Text>
      <Image source={require('../assets/login01.png')} style={styles.image} />
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
  image: {
    width: '260%',
    height: 465,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
})
