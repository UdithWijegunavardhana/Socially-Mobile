import React, { useState , useRef} from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
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
    navigation.reset({
      index: 0,
      routes: [{ name: 'OTPScreen' }],
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

      <View style={styles.row}>
        {/* <Text>Don’t have an account? </Text> */}
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>New User?</Text>
        </TouchableOpacity>
      </View>
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
