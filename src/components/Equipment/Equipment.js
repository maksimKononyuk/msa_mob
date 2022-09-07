import React, { useMemo } from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoading } from '../../redux/actionCreators'
import EquipmentItem from '../EquipmentItem/EquipmentItem'
import { EquipmentTranslale } from '../../Constants'
import styles from './styles'

const Equipment = ({ equipmentRequest }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.equipmentItem.isLoading)
  const equipmentArr = useSelector((state) => state.main.equipmentArr)
  const o_id = useSelector((state) => state.main.activeOrder?.description.o_id)

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new EquipmentTranslale(language), [language])

  const buttonHandler = () => {
    equipmentRequest(o_id)
    dispatch(setIsLoading(true))
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headetText}>{translate.getTitleLabel()}</Text>
        {isLoading ? (
          <ActivityIndicator size='large' color='#A9A9A9' />
        ) : (
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={buttonHandler}
          >
            <Image
              style={styles.buttonIcon}
              source={require('../../assets/icons/equipment.png')}
            />
          </TouchableOpacity>
        )}
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
