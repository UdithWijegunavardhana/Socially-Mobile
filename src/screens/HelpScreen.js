import React from 'react'
import { Text, View } from 'react-native'
import Background from '../components/Background'
import Button from '../components/Button'

export default function HelpScreen({ navigation }) {
  return (
    <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>This is Healp page</Text>
    </View>
  )
}
