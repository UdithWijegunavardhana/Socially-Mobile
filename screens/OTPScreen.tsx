import * as React from 'react';
import { StyleSheet } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Box , extendTheme} from "native-base"

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import {
  Button,
  Divider,
  Heading,
  VStack,
  Stack,
  ScrollView,
  Center,
  HStack,
  NativeBaseProvider,
} from "native-base"

export const GetOTP = () => {
  return (
  <Center>

    <Text style={styles.title}>Verify Your Phone</Text>
    <Text></Text>
    <Text>Please enter the 4 digit code sent to</Text>
    <Text></Text>
    <Text>+94 773456234</Text>

    <Center>
      <OTPInputView
        style={{width: '70%', height: 80 }}
        pinCount={4}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState({code})}}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled = {(code => {
            console.log(`Code is ${code}, you are good to go!`)
        })}
      />  
    </Center>
    
   

    <VStack>

      <HStack space={3} alignItems="center">
        <Text>Didn't receive a code?</Text>
        <Button size="sm" variant="ghost" colorScheme="primary">
              Resend OTP
        </Button>
      </HStack>

      <Button colorScheme="darkBlue" size="sm" variant="ghost">
        Wrong number
      </Button>

    </VStack>

  </Center>

  );
}

export default ({ navigation }: RootTabScreenProps<'TabOne'>) => {

  const theme = extendTheme({
    colors: {
      
      primary: {
        50: '#dbf4ff',
        100: '#addbff',
        200: '#7cc2ff',
        300: '#4aa9ff',
        400: '#1a91ff',
        500: '#0077e6',
        600: '#005db4',
        700: '#004282',
        800: '#002851',
        900: '#000e21',
      },
      
      amber: {
        500: '#d97706',
      },
    },
    config: {
      
      initialColorMode: 'dark',
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Center flex={0.9} px="0">
        <GetOTP />
      </Center>
      <Center>
        <Button bg="darkBlue.700" style={styles.button}
            onPress={() => navigation.navigate('NotFound')}>Sign In
        </Button>
      </Center>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },
 
  borderStyleHighLighted: {
    borderColor: "#0369a1",
  },
 
  underlineStyleBase: {
    width: 50,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
  },
 
  underlineStyleHighLighted: {
    borderColor: "#0369a1",
  },

  button:{
    marginTop: 30,
    marginHorizontal: 10,
    width: '80%',
    height: 45
  }
});
