import React, { useMemo } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
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
import CancelButton from '../CancelButton/CancelButton'
import { OperationResultTranslate } from '../../Constants'
import ErrorComponent from '../ErrorComponent/ErrorComponent'

const OperationResult = ({ finishOrder, relationArr }) => {
  const dispatch = useDispatch()

  const activeOrder = useSelector((state) => state.main.activeOrder)

  const userId = useSelector((state) => state.main.user?.u_id)

  const isErrorComponentVisible = useSelector(
    (state) => state.error.isErrorComponentVisible
  )

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(
    () => new OperationResultTranslate(language),
    [language]
  )

  const maretialsRequest = (index) => {
    if (activeOrder) {
      axios
        .get(`order_id_worker/${activeOrder._id}/${userId}`)
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
        <Text style={componentStyles.resultText}>
          {translate.getTitleLable()}
        </Text>
      </View>
      <View style={componentStyles.mainContainer}>
        <ScrollView>
          <View style={componentStyles.buttonsContainer}>
            {activeOrder?.operation.relation.map(
              (item, index) =>
                relationArr[index] !== false && (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      dispatch(
                        setFinishOrderParams({
                          nextOperationId: item.so_id,
                          relationId: item._id
                        })
                      )
                      if (
                        activeOrder?.operation.relation[index].function.length >
                        0
                      ) {
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
                    <Text style={componentStyles.itemResultText}>
                      {item.result}
                    </Text>
                    <Image
                      style={componentStyles.arrowIcon}
                      source={require('../../assets/images/arrow_white.png')}
                    />
                  </TouchableOpacity>
                )
            )}
          </View>
        </ScrollView>
        <CancelButton handler={() => dispatch(setModalVisible(false))} />
      </View>
      {isErrorComponentVisible && <ErrorComponent />}
    </View>
  )
}

export default OperationResult
