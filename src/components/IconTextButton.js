import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { theme } from '../core/theme'
import Apptext from './AppText'

const Icontextbutton = ({
  name,
  size = 20,
  color = theme.colors.primary,
  title,
  titleStyle,
  buttonStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <View></View>
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
        style={styles.icon}
      />
      <Apptext style={[styles.text, titleStyle]}>{title}</Apptext>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    height: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
  },
  icon: {
    marginLeft: 20,
  },
})

export default Icontextbutton
