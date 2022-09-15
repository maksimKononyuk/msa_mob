import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styles from './styles'

const MenuButton = ({ buttonColor, handler }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.headerButton}
      onPress={handler}
    >
      <View
        style={[styles.headerButtonLine, { backgroundColor: buttonColor }]}
      ></View>
      <View
        style={[styles.headerButtonLine, { backgroundColor: buttonColor }]}
      ></View>
    </TouchableOpacity>
  )
}

export default MenuButton
