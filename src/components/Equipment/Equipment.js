import React from 'react'
import { ScrollView, View, Text, Image, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import EquipmentItem from '../EquipmentItem/EquipmentItem'
import styles from './styles'

const Equipment = ({ equipmentRequest }) => {
  const equipmentArr = useSelector((state) => state.main.equipmentArr)
  const o_id = useSelector((state) => state.main.activeOrder)
  const buttonHandler = () => {
    equipmentRequest(o_id)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headetText}>Choose equipment</Text>
        <Pressable style={styles.button} onPress={buttonHandler}>
          <Image source={require('../../assets/icons/equipment.png')} />
        </Pressable>
      </View>
      <ScrollView>
        {equipmentArr.map((item, index) => {
          return <EquipmentItem key={item._id} index={index} />
        })}
      </ScrollView>
    </View>
  )
}

export default Equipment
