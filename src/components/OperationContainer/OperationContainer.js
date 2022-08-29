import React from 'react'
import { View, Text } from 'react-native'
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
      <Text style={componentStyles.descriptionNameText}>{name}</Text>
    </View>
  )
}

export default OperationContainer
