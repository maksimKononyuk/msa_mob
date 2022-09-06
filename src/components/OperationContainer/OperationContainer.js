import React, { useMemo } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { windowWidth, OperationContainerTranslate } from '../../Constants'
import styles from '../../styles/Styles'
import componentStyles from './styles'

const OperationContainer = () => {
  const name = useSelector((state) => state.main.activeOrder?.description?.name)
  const language = useSelector((state) => state.main.language)
  const translate = useMemo(
    () => new OperationContainerTranslate(language),
    [language]
  )
  return (
    <View
      style={{
        ...styles.operationContainer,
        paddingLeft: windowWidth <= 480 ? 10 : 25,
        backgroundColor: windowWidth > 480 ? 'transparent' : '#fff'
      }}
    >
      <Text style={componentStyles.operationText}>
        {translate.getTitleLabel()}
      </Text>
      <ScrollView style={componentStyles.scrollContainer}>
        <Text style={componentStyles.descriptionNameText}>{name}</Text>
      </ScrollView>
    </View>
  )
}

export default OperationContainer
