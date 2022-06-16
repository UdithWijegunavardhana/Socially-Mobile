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

const Editprofilescreen = () => {
  const [name, setName] = useState({ value: '', error: '' })
  const renderInner = () => <Text>Hello</Text>
  const url = API.host;
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  )

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
      url: (API.host+'/publisher/update'),
      headers: {
        'Authorization':`Bearer ${userToken}`,
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

  let bs = React.createRef()
  let fall = new Animated.Value(1)
  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              bs.current.snapTo(0)
            }}
          >
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ImageBackground
                source={require('../assets/avatar.jpg')}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 50 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name={'camera'}
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
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
