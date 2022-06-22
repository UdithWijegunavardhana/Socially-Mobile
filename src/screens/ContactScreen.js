import React from 'react'
import { SafeAreaView, Text, View,StyleSheet,Linking } from 'react-native'
import Apptext from '../components/AppText'
import Icontextbutton from '../components/IconTextButton'
import { theme } from '../core/theme'

export default function ContactScreen({ navigation }) {
  const pressCall=()=>{
    const url='tel://+94 777 888 999'
    Linking.openURL(url)
  }
  
  return (
    <SafeAreaView style = {{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:theme.colors.primary,}}>
      <View>
      <View style={{marginTop:10,alignItems:'center'}} >
      <Apptext children='Call' style={{color:theme.colors.light, fontSize:25, fontWeight:'700'}}/>
       <Icontextbutton title='+94 777 888 999' name='phone' color={theme.colors.medium} buttonStyle={{borderRadius:5, paddingRight:10,}} onPress={pressCall}/>
      </View>
      </View>
      <View>
      <View style={{marginTop:20,alignItems:'center'}} >
      <Apptext children='Email' style={{color:theme.colors.light, fontSize:25, fontWeight:'700'}}/>
       <Icontextbutton title='digitalx@gamil.com' name='email' color={theme.colors.medium} buttonStyle={{borderRadius:5, paddingRight:10,}}/>
      </View>
      </View>
      <View>
      <View style={{marginTop:20, alignItems:'center'}} >
      <Apptext children='Address' style={{color:theme.colors.light, fontSize:25, fontWeight:'700'}}/>
      <View style={styles.addressContainer}> 
      <Apptext children='DigitalX (Pvt) Ltd. 2nd floor,' style={styles.address}/>
        <Apptext children=' 111/15, Hunupitiya Lake Road,' style={styles.address}/>
        <Apptext children='Colombo 2, Sri Lanka' style={styles.address}/>
      </View>    
      </View>
      </View>
      <View>
      <Apptext children='Copyright 2019 DigitalX Labs.' style={{color:theme.colors.light,marginTop:100}}/>
      </View>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  addressContainer:{
    backgroundColor:theme.colors.light,
    alignItems:'center',
    justifyContent:'center',
    width:300,
    padding:5,
    borderRadius:5
  },
  address:{
      fontSize:17,
      marginVertical:3
  }
})