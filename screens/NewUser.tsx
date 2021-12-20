import * as React from 'react';
import { StyleSheet } from 'react-native';
import { VStack, Input, Center, Heading, NativeBaseProvider , Box , extendTheme} from "native-base"
import { Stack, Button , Image , InputGroup,InputLeftAddon } from "native-base";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export function Example() {
  return (
    <Image 
      source={{
        uri: '../assets/images/homeimg01.png',
      }}
      alt="Alternate Text"
      size="xl"
    />
  )
}

export const GetName = () => {
  return (
    <Stack
      w={{
        base: "80%",
        md: "25%",
      }}
    >
      <Input borderColor="darkBlue.700" fontSize="16" color="darkBlue.700" style={{height:45, marginBottom: 30}} variant="outline" placeholder="Your Name" />
    </Stack>
  )
}

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

const customTheme = extendTheme({ config });

export const GetMobile = () => {
  return (
    <Stack alignItems="center">
      <InputGroup style={{height:45}} 
        w={{
          base: "80%",
          md: "285",
        }}
      >
        <InputLeftAddon bg="darkBlue.700" fontSize="16" borderColor="darkBlue.700" children={"+94"} />
        <Input borderColor="darkBlue.700" fontSize="16" color="darkBlue.700"
          w={{
            base: "85%",
            md: "100%",
          }}
          placeholder="Your Phone "
        />
      </InputGroup>
    </Stack>
  )
}

export default ({ navigation }: RootTabScreenProps<'TabOne'>) => {

  const theme = extendTheme({
    colors: {
      
      primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      
      amber: {
        400: '#d97706',
      },
    },
    config: {
      
      initialColorMode: 'dark',
    },
  });

  return (
    <NativeBaseProvider theme={theme}>

      <Center flex={0.9} px="0">
        <Example />
      </Center>

      <Center>
        <GetName />
        <GetMobile />
        <Button bg="darkBlue.700" style={styles.button}
            onPress={() => navigation.navigate('NotFound')}>Sign Up
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
  button:{
    marginTop: 30,
    marginHorizontal: 10,
    width: '80%',
    height: 45
  }

});

