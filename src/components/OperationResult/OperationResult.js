import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from '../../styles/Styles'
import axios from 'axios'
import componentStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  setModalVisible,
  setMaterialsArr,
  setShowMaterialsComponent,
  setFinishOrderParams,
  setErrorMessage,
  setIsErrorComponentVisible
} from '../../redux/actionCreators'
import ErrorComponent from '../ErrorComponent/ErrorComponent'

const OperationResult = ({ finishOrder }) => {
  const dispatch = useDispatch()

  const activeOrder = useSelector((state) => state.main.activeOrder)

  const userId = useSelector((state) => state.main.user.u_id)

  const isErrorComponentVisible = useSelector(
    (state) => state.error.isErrorComponentVisible
  )

  const maretialsRequest = (index) => {
    if (activeOrder) {
      axios
        .get(`order_id_worker/${activeOrder._id}/${userId}/`)
        .then((res) =>
          dispatch(
            setMaterialsArr(res.data[0].operation.relation[index].function)
          )
        )
        .catch((err) => {
          console.log('Network error when receiving materials ' + err)
          dispatch(setErrorMessage('when receiving materials ' + err))
          dispatch(setIsErrorComponentVisible(true))
        })
    }
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
      }}
    >
      <View style={componentStyles.resultContainer}>
        <Text style={componentStyles.resultText}>Operation result</Text>
      </View>
      {activeOrder?.operation.relation.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            dispatch(
              setFinishOrderParams({
                nextOperationId: item.so_id,
                relationId: item._id
              })
            )
            if (activeOrder?.operation.relation[index].function.length > 0) {
              maretialsRequest(index)
              dispatch(setShowMaterialsComponent(true))
            } else {
              finishOrder(item.so_id, item._id)
            }
          }}
          key={item._id}
          style={{
            ...styles.center,
            ...styles.operationItem,
            backgroundColor: item.bgr_color
          }}
        >
          <Text style={componentStyles.itemResultText}>{item.result}</Text>
          <Image
            style={componentStyles.arrowIcon}
            source={require('../../assets/images/arrow_white.png')}
          />
        </TouchableOpacity>
      ))}
      <View style={componentStyles.canselButtonContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ ...styles.center, ...styles.cancelContainer }}
          onPress={() => {
            dispatch(setModalVisible(false))
          }}
        >
          <Image
            style={componentStyles.closeIcon}
            source={require('../../assets/images/close.png')}
          />
          <Text style={componentStyles.canselButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {isErrorComponentVisible && <ErrorComponent />}
    </View>
  )
}

export default OperationResult
