import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { nameValidator } from '../helpers/nameValidator'
import OTPScreen from './OTPScreen'
import { AuthContext } from '../helpers/Utils'

export default function RegisterScreen({ route, navigation }) {
  const [name, setName] = useState({ value: '', error: '' })

  const { signIn } = React.useContext(AuthContext)
  const { phoneNumber } = route.params
  function onGetOtpPressed() {
    const nameError = nameValidator(name.value)
    if (nameError) {
      setName({ ...name, error: nameError })
      return
    }

    console.log(phoneNumber)
    //API connection
    var axios = require('axios')
    var data = JSON.stringify({
      userName: name,
      phoneNumber: phoneNumber,
    })

    var config = {
      method: 'post',
      url: 'http://localhost:3000/auth/publisherRegister',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function onLoginPressed() {
    signIn({ phoneNumber, otpInput })
  }

  return (
    <Background>
      <Header>Create Your Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <Button
        mode="contained"
        onPress={() => {
          onGetOtpPressed()
          onLoginPressed()
        }}
        style={{ marginTop: 24 }}
      >
        Create Account
      </Button>

      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
