import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'

const UserMenuItem = ({ title, handler }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.menuItem}
      onPress={handler}
    >
      <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default UserMenuItem
