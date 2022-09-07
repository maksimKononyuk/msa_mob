import React, { useMemo } from 'react'
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage, setIsUserMenuModal } from '../../redux/actionCreators'
import { SettingsComponentTranslate } from '../../Constants'
import styles from './styles'

const SettingsComponent = () => {
  const dispatch = useDispatch()
  const language = useSelector((state) => state.main.language)
  const translate = useMemo(
    () => new SettingsComponentTranslate(language),
    [language]
  )
  return (
    <Modal animationType='slide' transparent={true} visible={true}>
      <View style={styles.container}>
        <Text style={styles.modalTitle}>{translate.getLanguageLabel()}</Text>
        <View style={styles.buttonBlock}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={() => {
              AsyncStorage.setItem('lang', 'en')
              dispatch(setLanguage('en'))
              dispatch(setIsUserMenuModal(false))
            }}
          >
            <Text style={styles.buttonText}>{translate.getEnglishLabel()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={() => {
              AsyncStorage.setItem('lang', 'ru')
              dispatch(setLanguage('ru'))
              dispatch(setIsUserMenuModal(false))
            }}
          >
            <Text style={styles.buttonText}>{translate.getRussianLabel()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default SettingsComponent