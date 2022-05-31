import React from 'react'
import { View, Pressable, Image, Text, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setModalVisible, setIsConfirmation } from '../../redux/actionCreators'
import styles from '../../styles/Styles'
import componentStyles from './styles'

const StartFinishButton = ({ startOrder }) => {
  const dispatch = useDispatch()
  const orderStarted = useSelector((state) => state.main.orderStarted)
  const isConfirmation = useSelector((state) => state.main.isConfirmation)
  const selectedItems = useSelector((state) => state.main.selectedItems)
  const isEquipmentEmpty = useSelector(
    (state) => state.startFinishButton.isEquipmentEmpty
  )
  return (
    <View style={componentStyles.container}>
      {isConfirmation ? (
        <View style={componentStyles.okCloseButtonsContainer}>
          <Pressable
            style={[
              componentStyles.buttonContainer,
              { backgroundColor: orderStarted ? '#029C6E' : '#0080FF' }
            ]}
            onPress={
              orderStarted
                ? () => dispatch(setModalVisible(true))
                : () => startOrder()
            }
          >
            <Image
              source={require('../../assets/images/ok.png')}
              style={componentStyles.okIcon}
            />
          </Pressable>
          <Pressable
            style={[
              componentStyles.buttonContainer,
              { backgroundColor: '#2D2D2D' }
            ]}
            onPress={() => dispatch(setIsConfirmation(false))}
          >
            <Image
              source={require('../../assets/images/close.png')}
              style={componentStyles.closeIcon}
            />
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={{
            ...styles.container,
            backgroundColor: orderStarted
              ? '#009C6D'
              : selectedItems.length > 0 || isEquipmentEmpty
              ? '#0080FF'
              : 'gray'
          }}
          onPress={() => {
            orderStarted
              ? dispatch(setIsConfirmation(true))
              : isEquipmentEmpty || selectedItems.length > 0
              ? dispatch(setIsConfirmation(true))
              : Alert.alert('Choose equipment!')
          }}
        >
          <Text style={componentStyles.titleText}>
            {orderStarted ? 'FINISH' : 'START'}
          </Text>
        </Pressable>
      )}
    </View>
  )
}

export default StartFinishButton
