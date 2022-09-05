import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { windowWidth } from '../../Constants'
import styles from '../../styles/Styles'
import componentStyles from './styles'

const OperationContainer = () => {
  const name = useSelector((state) => state.main.activeOrder?.description?.name)
  return (
    <View
      style={{
        ...styles.operationContainer,
        paddingLeft: windowWidth <= 480 ? 10 : 25,
        backgroundColor: windowWidth > 480 ? 'transparent' : '#fff'
      }}
    >
      <Text style={componentStyles.operationText}>Operation</Text>
      <ScrollView style={componentStyles.scrollContainer}>
        <Text style={componentStyles.descriptionNameText}>{name}</Text>
      </ScrollView>
    </View>
  )
}

export default OperationContainer
