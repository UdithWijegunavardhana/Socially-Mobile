import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { theme } from './../core/theme'
import Button from '../components/Button'
import { Avatar, Divider } from 'react-native-paper'
import Icontext from '../components/IconText'
import Apptext from '../components/AppText'
import Icontextbutton from '../components/IconTextButton'
import { AuthContext } from '../helpers/Utils'
import * as SecureStore from 'expo-secure-store'
import { API } from '../navigation/host'

const Profilescreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    let userToken = await SecureStore.getItemAsync('userToken')

    var axios = require('axios')
    var config = {
      method: 'get',
      url: (API.host+'publisher'),
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }

    axios(config)
      .then(function (response) {
        const data = JSON.stringify(response.data)
        setName(response.data.name)
        setPhone(response.data.phoneNumber)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const { signOut } = React.useContext(AuthContext)
  return (
    <SafeAreaView
      style={{ padding: 5, backgroundColor: theme.colors.white, flex: 1 }}
    >
      <View style={styles.userInfoSection}>
        <View style={styles.userData}>
          <Apptext children={name} style={styles.userName} />
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <View>
          <Icontext
            name="map-marker"
            text="Sri Lanka"
            size={20}
            iconColor={theme.colors.medium}
            style={styles.iconText}
          />
          </View>
          <View>
          <Icontext
            name="phone"
            text={phone}
            size={20}
            iconColor={theme.colors.medium}
            style={styles.iconText}
          />
          </View>
          </View>
        </View>
      </View>
      <View style={styles.earningInfoSection}>
        <Icontext
          name="information-outline"
          text="Estimated Earnings"
          size={15}
          iconColor={theme.colors.medium}
          style={{color:theme.colors.medium, fontWeight:"500"}}
        />
        <View style={{ flexDirection: 'row' }}>
          <Apptext children="US$" style={styles.amount} />
          <Apptext children="230.00" style={styles.amount} />
        </View>
        <Button
          mode="contained"
          uppercase={false}
          // disabled={!loading}
          labelStyle={styles.labelStyle}
          onPress={() => navigation.navigate('Paymentsscreen')}
        >
          Withdraw
        </Button>
      </View>
      <View style={styles.navigationSection}>
        <Icontextbutton name="help-circle" title="Help" buttonStyle={{borderBottomColor:theme.colors.medium,borderBottomWidth:1,borderTopColor:theme.colors.medium,borderTopWidth:1}}/>
        <Icontextbutton
          name="bank-transfer"
          title="View Transactions"
          onPress={() => navigation.navigate('TransactionScreen')}
          buttonStyle={{borderBottomColor:theme.colors.medium,borderBottomWidth:1}}
        />
        <Icontextbutton name="logout" title="Log Out" onPress={signOut} buttonStyle={{borderBottomColor:theme.colors.medium,borderBottomWidth:1}}/>
   
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  profileImageContainer: {
    padding: 5,
  },
  iconText: {
    color: theme.colors.dark,
    fontSize: 17,
    paddingHorizontal: 5,
    fontWeight:"700"
  },
  userName: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 20,
  },
  userData: {
    margin: 20,
    backgroundColor:theme.colors.light,
    marginHorizontal:3,
    borderRadius:10,
    padding:20
  },
  userInfoSection: {
    flex: 2,
    justifyContent:"center",
    marginBottom: 5,
  },
  earningInfoSection: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  navigationSection: {
    flex: 4,
    flexDirection: 'column',
    justifyContent:"flex-end",
    marginBottom:5
  },
  amount: {
    fontSize: 44,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  labelStyle: {
    fontSize: 17,
    fontWeight: '500',
    marginHorizontal:3,
    borderRadius:10
  },
  navButton: {},
  navButtonsText: {
    fontSize: 17,
    color: theme.colors.dark,
  },
})

export default Profilescreen
