import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text,
  SafeAreaView,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import TextInput from '../components/TextInput'
import Animated from 'react-native-reanimated'
import BottomSheet from 'reanimated-bottom-sheet'
import Button from '../components/Button'
import { nameValidator } from './../helpers/nameValidator'
import * as SecureStore from 'expo-secure-store'
import {API} from '../navigation/host'
import Apptext from '../components/AppText'

const Editprofilescreen = () => {
  const [name, setName] = useState({ value: '', error: '' })
  const [status,setStatus] = useState('')
  const onSubmit = async() => {
    const nameError = nameValidator(name.value)
    if (nameError) {
      setName({ ...name, error: nameError })
      return
    }
    let userToken = await SecureStore.getItemAsync('userToken')
    var axios = require('axios')
    var data = JSON.stringify({
      userName: name.value,
    })

    var config = {
      method: 'put',
      url: (API.host+'publisher/update'),
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        console.log(response.data.userName)
        let newName = (JSON.stringify(response.data.userName))
        setName({ name:newName, error:'' })
        if(newName){
          setStatus('Name Updated Successfuly !\n Your new username is :\n'+newName)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <SafeAreaView style={styles.container}>
    
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
            {name.value}
          </Text>
        </View>
        <View style={styles.action}>
          <TextInput
            label="User Name"
            autoCorrect={false}
            onChangeText={(text) => setName({ value: text, error: '' })}
            errorText={name.error}
          />
        </View>
        <Button mode="contained" onPress={onSubmit}>
          Submit
        </Button>
      </View>
      <View>
        <Apptext style={{fontSize:25,fontWeight:"700"}}>{status}</Apptext>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
})

export default Editprofilescreen
