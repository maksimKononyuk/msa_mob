import React, { useMemo } from 'react'
import { TouchableOpacity, Image, Text } from 'react-native'
import styles from '../../styles/Styles'
import componentStyles from './styles'
import { useSelector } from 'react-redux'
import { CancelButtonTranslate } from '../../Constants'

const CancelButton = ({ handler }) => {
  const language = useSelector((state) => state.main.language)
  const translate = useMemo(
    () => new CancelButtonTranslate(language),
    [language]
  )
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        ...styles.center,
        ...styles.cancelContainer
      }}
      onPress={handler}
    >
      <Image
        style={componentStyles.closeIcon}
        source={require('../../assets/images/close.png')}
      />
      <Text style={componentStyles.cancelText}>
        {translate.getCancelLabel()}
      </Text>
    </TouchableOpacity>
  )
}

export default CancelButton
