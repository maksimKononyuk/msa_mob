import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'

const OKButton = ({ handler }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.okButton}
      onPress={handler}
    >
      <Text style={styles.okButtonText}>OK!</Text>
    </TouchableOpacity>
  )
}

export default OKButton
