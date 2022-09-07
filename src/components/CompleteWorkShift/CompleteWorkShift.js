import React, { useMemo } from 'react'
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import done from '../../assets/images/ok.png'
import cancel from '../../assets/images/no.png'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { setIsCompleteWorkShiftVisible } from '../../redux/actionCreators'
import { CompleteWorkShiftTranslate } from '../../Constants'

const CompleteWorkShift = ({ logOut }) => {
  const dispatch = useDispatch()
  const language = useSelector((state) => state.main.language)
  const translate = useMemo(
    () => new CompleteWorkShiftTranslate(language),
    [language]
  )
  return (
    <Modal animationType='slide' transparent={true} visible={true}>
      <View style={styles.container}>
        <Text style={styles.modalTitle}>{translate.getInfoLable()}</Text>
        <View style={styles.buttonBlock}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.button, styles.greenButton]}
            onPress={() => logOut()}
          >
            <Image source={done} style={styles.okButton} />
            <Text style={styles.buttonText}>{translate.getYesLable()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.button, styles.redButton]}
            onPress={() => dispatch(setIsCompleteWorkShiftVisible(false))}
          >
            <Image source={cancel} style={styles.noButton} />
            <Text style={styles.buttonText}>{translate.getNoLable()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default CompleteWorkShift
