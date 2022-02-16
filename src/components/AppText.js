import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { theme } from '../core/theme'
import { Platform } from 'react-native'

const Apptext = ({ children, style, numberOfLines }) => {
  return (
    <Text style={[styles.Text, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS == 'android' ? 'Roboto' : 'Avenir',
  },
})

export default Apptext
