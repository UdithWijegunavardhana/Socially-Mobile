import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Apptext from './AppText'
import { theme } from './../core/theme'

const Icontext = ({ name, size, iconColor, text, style }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={name} size={size} color={iconColor} />
      <Apptext style={[styles.text, style]}>{text}</Apptext>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  text: {
    fontSize: 16,
    color: theme.colors.dark,
    marginLeft: 5,
  },
})

export default Icontext
