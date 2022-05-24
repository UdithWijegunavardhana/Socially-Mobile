import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { theme } from './../core/theme'
import Button from '../components/Button'
import { Avatar, Divider } from 'react-native-paper'
import Icontext from '../components/IconText'
import Apptext from '../components/AppText'
import Icontextbutton from '../components/IconTextButton'

const Profilescreen = () => {
  return (
    <SafeAreaView
      style={{ padding: 5, backgroundColor: theme.colors.white, flex: 1 }}
    >
      <View style={styles.userInfoSection}>
        <View style={styles.profileImageContainer}>
          <Avatar.Image size={127} source={require('../assets/avatar.jpg')} />
        </View>
        <View style={styles.userData}>
          <Apptext children="Jhone S. Mathew" style={styles.userName} />
          <Icontext
            name="phone"
            text="+94 72 2388 200"
            size={20}
            iconColor={theme.colors.medium}
            style={styles.iconText}
          />
          <Icontext
            name="map-marker"
            text="Sri Lanka"
            size={20}
            iconColor={theme.colors.medium}
            style={styles.iconText}
          />
        </View>
      </View>
      <Divider />
      <View style={styles.earningInfoSection}>
        <Icontext
          name="information-outline"
          text="Estimated Earnings"
          size={15}
          iconColor={theme.colors.medium}
          style={styles.iconText}
        />
        <View style={{ flexDirection: 'row' }}>
          <Apptext children="US$" style={styles.amount} />
          <Apptext children="230.00" style={styles.amount} />
        </View>
        <Button
          mode="contained"
          uppercase={false}
          labelStyle={styles.labelStyle}
          onPress={() => console.log('Withraw page')}
        >
          Withdraw
        </Button>
      </View>
      <View style={styles.navigationSection}>
        <Icontextbutton name="help-circle" title="Help" />
        <Icontextbutton name="bank-transfer" title="View Transactions" />
        <Icontextbutton name="currency-usd-circle" title="My Earnings" />
        <Icontextbutton name="logout" title="Log Out" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  profileImageContainer: {
    padding: 5,
  },
  iconText: {
    color: theme.colors.medium,
    fontSize: 15,
    paddingHorizontal: 5,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
  },
  userData: {
    marginLeft: 20,
  },
  userInfoSection: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  earningInfoSection: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  navigationSection: {
    flex: 4,
    flexDirection: 'column',
    marginTop: '20%',
  },
  amount: {
    fontSize: 44,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  labelStyle: {
    fontSize: 17,
    fontWeight: '500',
  },
  navButton: {},

  navButtonsText: {
    fontSize: 17,
    color: theme.colors.dark,
  },
})

export default Profilescreen
