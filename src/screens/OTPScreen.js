import React, { useState, useRef, useEffect, Component } from 'react'
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import OTPTextView from 'react-native-otp-textinput'
import Background from '../components/Background'

export class OTPScreen extends Component {
  state = {
    otpInput: '',
    inputText: '',
  }
  alertText = () => {
    const { otpInput = '' } = this.state
    if (otpInput) {
      Alert.alert(otpInput)
    }
  }
  clear = () => {
    this.input1.clear()
  }
  updateOtpText = () => {
    this.input1.setValue(this.state.inputText)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Verify Your Phone</Text>
        <Text style={styles.textInputContainer}>
          Please enter the 4 digit code sent to
        </Text>
        <Text>+94 773456234</Text>

        <OTPTextView
          ref={(e) => (this.input1 = e)}
          containerStyle={styles.textInputContainer}
          handleTextChange={(text) => this.setState({ otpInput: text })}
          inputCount={4}
          keyboardType="numeric"
        />

        <PaperButton mode="outlined" onPress={this.alertText} uppercase={false}>
          Verify
        </PaperButton>

        <View style={styles.buttonWrapper}>
          <Text style={styles.textNearButton}> Didn't receive a code ? </Text>
          <PaperButton style={styles.buttonStyle} mode="text" uppercase={false}>
            Resend OTP
          </PaperButton>
        </View>
      </View>
    )
  }
}

export default function verify({ navigation }) {
  return (
    <Background>
      <OTPScreen />
      <PaperButton
        style={styles.wrongNumButton}
        mode="text"
        uppercase={false}
        onPress={() => navigation.navigate('LoginScreen')}
        // onPress={() =>
        //   navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'LoginScreen' }],
        //   })
        // }
      >
        Wrong number
      </PaperButton>
      <PaperButton
        style={styles.verifyButton}
        mode="contained"
        // onPress={() => navigation.navigate('Dashboard')}
        // onPress={() =>
        //   navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'Dashboard' }],
        //   })
        // }
      >
        Continue
      </PaperButton>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.35,
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
})
