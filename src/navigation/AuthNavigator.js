import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  SplashScreen,
  LoginScreen,
  RegisterScreen,
  OTPScreen,
  ViewAdsScreen,
  ProfileScreen,
  Editprofilescreen,
  Paymentsscreen,
  TransactionScreen,
} from '../screens'
import { IconButton } from 'react-native-paper'
import * as SecureStore from 'expo-secure-store'
import { theme } from '../core/theme'
import { AuthContext } from '../helpers/Utils'

const AuthStack = createStackNavigator()
function StackAuth({ navigation }) {
  return (
    <AuthStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: 'Socially' }}
      />
      <AuthStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ title: 'Register' }}
      />
      <AuthStack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{ title: 'OTP' }}
      />
    </AuthStack.Navigator>
  )
}

const AppStack = createStackNavigator()
function StackApp({ navigation }) {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    >
      <AppStack.Screen
        name="ViewAdsScreen"
        component={ViewAdsScreen}
        options={({ navigation }) => ({
          title: 'Advertisements',
          headerRight: () => (
            <IconButton
              icon="account"
              onPress={() => navigation.navigate('ProfileScreen')}
            />
          ),
        })}
      />
      <AppStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: 'My Account',
          headerRight: () => (
            <IconButton
              icon="account-edit"
              onPress={() => navigation.navigate('Editprofilescreen')}
            />
          ),
        })}
      />
      <AppStack.Screen
        name="Editprofilescreen"
        component={Editprofilescreen}
        options={({ navigation }) => ({
          title: 'Edit Account',
        })}
      />
      <AppStack.Screen
        name="Paymentsscreen"
        component={Paymentsscreen}
        options={({ navigation }) => ({
          title: 'Withdraw',
        })}
      />
      <AppStack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={({ navigation }) => ({
          title: 'Transaction History',
        })}
      />
    </AppStack.Navigator>
  )
}

const Stack = createStackNavigator()

export default function NavStack({ navigation }) {


  const [isNewUser, setIsNewUser] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [userToken, setUserToken] = useState('')
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {

        var axios = require('axios')
        var data = JSON.stringify({
          phoneNumber: data.phoneNumber,
          otp: data.otpInput,
        })

        var config = {
          method: 'post',
          url: 'http://10.0.2.2:3000/auth/otp',
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        }


        axios(config)
          .then(function (response) {
              setUserToken(response.data.accessToken)
              setIsNewUser(response.data.isNewUser)
          })
          .catch(function (error) {
            let Err = error.message
            setLoginErr(Err)
          })
          if(!isNewUser){
            try {
              await SecureStore.setItemAsync('userToken', userToken)
            } catch (err) {
              console.log("Error in Storing :"+err)  
            }
            dispatch({ type: 'SIGN_IN', userToken })
          }else{
            console.log("Error in Login :"+loginErr);
          }
       
      },
      signOut: async() => {
        try {
          await SecureStore.setItemAsync('userToken')
        } catch (err) {
          console.log("Error in storage :"+err)  
        }
        dispatch({ type: 'SIGN_OUT' })},
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: userToken })
      },
    }),
    []
  )

  React.useEffect(() => {
    setTimeout(()=>{
      const bootstrapAsync = async () => {
        let userToken
        try {
          userToken = await SecureStore.getItemAsync('userToken')
          console.log('Token Restored : ' + userToken)
        } catch (e) {
          console.log('Restoring token failed')
        }
        dispatch({ type: 'RESTORE_TOKEN', token: userToken })
      }
      bootstrapAsync()
    },1000)   
  }, [])


  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          }
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          }
          case 'SIGN_UP':
            return{
              ...prevState,
              isLoading: false,
              userName:action.userName
            }
        case 'SIGN_OUT':
          SecureStore.deleteItemAsync('userToken')
          console.log('you are loged out')
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userName:null
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userName:null,
    }
  )

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {state.isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : state.userToken == null ? (
          <>
            <Stack.Screen name="SignIn" component={StackAuth} />
          </>
        ) : (
          <>
            <Stack.Screen name="ViewAdsScreen" component={StackApp} />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  )
}
