import React, { useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedItemsCheced,
  setSelectedItemsUnCheced,
  setIsChecked,
  setIsCheckedArr
} from '../../redux/actionCreators'
import styles from './styles'

const EquipmentItem = ({ index }) => {
  const dispatch = useDispatch()

  const isChecked = useSelector((state) => state.equipmentItem.isChecked)
  const isBusy = useSelector((state) => state.main.equipmentArr[index].occupied)
  const title = useSelector((state) => state.main.equipmentArr[index].name)
  const id = useSelector((state) => state.main.equipmentArr[index]._id)

  useEffect(() => {
    dispatch(setIsCheckedArr())
  }, [])

  useEffect(() => {
    setArr()
  }, [isChecked[index]])

  const itemHandler = () => {
    if (!isBusy) {
      dispatch(setIsChecked(index))
    }
  }

  const setArr = () => {
    if (isChecked[index]) {
      dispatch(setSelectedItemsCheced(id))
    } else {
      dispatch(setSelectedItemsUnCheced(id))
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={itemHandler}
    >
      <View style={styles.checkAndTitleContainer}>
        <View
          style={[
            styles.checkIcon,
            { backgroundColor: isChecked[index] ? '#0080FF' : '#F2F2F2' }
          ]}
        >
          {isChecked[index] && (
            <Image
              source={require('../../assets/images/ok.png')}
              style={styles.okButton}
            />
          )}
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={[styles.busy, { opacity: isBusy ? 1 : 0 }]}>
        <Text style={styles.busyText}>busy</Text>
      </View>
    </TouchableOpacity>
  )
}

export default EquipmentItem
