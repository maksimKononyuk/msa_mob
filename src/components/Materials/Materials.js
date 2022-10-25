import React, { useMemo } from 'react'
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { MaterialsTranslate } from '../../Constants'
import { setShowMaterialsComponent } from '../../redux/actionCreators'
import MaterialItem from '../MaterialItem/MaterialItem'
import styles from './styles'

const Materials = ({ finishOrder }) => {
  const dispatch = useDispatch()
  const materialsArr = useSelector((state) => state.main.materialsArr)
  const finishOrderParams = useSelector((state) => state.main.finishOrderParams)

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new MaterialsTranslate(language), [language])

  const cancelButtonHandler = () => {
    dispatch(setShowMaterialsComponent(false))
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>{translate.getTitleLabel()}</Text>
      </View>
      <ScrollView style={styles.container}>
        {materialsArr.length === 0 ? (
          <ActivityIndicator size='large' color='#000088' />
        ) : (
          <>
            {materialsArr.map((item, index) => (
              <MaterialItem key={item._id} index={index} />
            ))}
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.okButton}
              onPress={() =>
                finishOrder(
                  finishOrderParams.nextOperationId,
                  finishOrderParams.relationId
                )
              }
            >
              <Text style={styles.okButtonText}>Ok</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.cancelButton}
        onPress={cancelButtonHandler}
      >
        <View style={styles.cross}>
          <View style={[styles.line, styles.upLine]}></View>
          <View style={[styles.line, styles.downLine]}></View>
        </View>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </>
  )
}

export default Materials
