import * as React from 'react';
import { StyleSheet } from 'react-native';
import { VStack, Input, Center, Heading, NativeBaseProvider , Box , extendTheme} from "native-base"
import { Stack, Button , Image , InputGroup,InputLeftAddon, FormControl } from "native-base";

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

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

const customTheme = extendTheme({ config });

export const GetMobileNumber = () => {

  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({
        ...errors,
        name: 'Name is required',
      });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({
        ...errors,
        name: 'Name is too short',
      });
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    validate() ? console.log('Submitted') : console.log('Validation Failed');
  };

  return (
    
    <VStack width="80%" mx="3">
      <FormControl isRequired isInvalid={'name' in errors}>
        {/* <FormControl.Label _text={{bold: true}}></FormControl.Label> */}
        <InputGroup style={{height:45}} 
        w={{base: "80%", md: "285"}}
      >
        <InputLeftAddon bg="darkBlue.700" fontSize="16" borderColor="darkBlue.700" children={"+94"} />
        <Input borderColor="darkBlue.700" fontSize="16" color="darkBlue.700"
          w={{
            base: "108%",
            md: "100%",
          }}
          placeholder="Your Phone"
        />
      </InputGroup>
        {'name' in errors ?
        <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>Error</FormControl.ErrorMessage>
:
        <FormControl.HelperText _text={{fontSize: 'xs'}}>
          
        </FormControl.HelperText>
        }
      </FormControl>
  
    </VStack>
  );
}

    // <Stack alignItems="center">
    //   <InputGroup style={{height:45}} 
    //     w={{
    //       base: "80%",
    //       md: "285",
    //     }}
    //   >
    //     <InputLeftAddon bg="darkBlue.700" fontSize="16" borderColor="darkBlue.700" children={"+94"} />
    //     <Input borderColor="darkBlue.700" fontSize="16" color="darkBlue.700"
    //       w={{
    //         base: "85%",
    //         md: "100%",
    //       }}
    //       placeholder="Your Phone "
    //     />
    //   </InputGroup>
    // </Stack>
  

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

  const onSubmit = () => {
    validate() ? console.log('Submitted') : console.log('Validation Failed');
  };

  return (
    <NativeBaseProvider theme={theme}>
  
      <Center flex={0.9} px="0">
        <Example />
      </Center>
      <Center>
        <GetMobileNumber />
        <Button onPress={onSubmit} bg="darkBlue.700" style={styles.button}
          onPress={() => navigation.navigate('NotFound')}>Sign In
        </Button>

        <Button style={{marginTop:10}} colorScheme="darkBlue" size="sm" variant="ghost" 
          onPress={() => navigation.navigate('NewUser')}> New User?
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

