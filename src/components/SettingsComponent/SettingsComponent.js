import React, { useMemo, useState, useEffect } from 'react'
import { View, Text, Modal } from 'react-native'
import * as Application from 'expo-application'
import OKButton from '../OKButton/OKButton'
import CancelButton from '../CancelButton/CancelButton'
import SettingsComponentItem from '../SettingsComponentItem/SettingsComponentItem'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage, setIsUserMenuModal } from '../../redux/actionCreators'
import {
  SettingsComponentTranslate,
  UserMenuModalTranslate
} from '../../Constants'
import axios from 'axios'
import styles from './styles'

const SettingsComponent = ({ setIsSettingsVisible }) => {
  const dispatch = useDispatch()
  const globalLanguage = useSelector((state) => state.main.language)
  const [hosting, setHosting] = useState('https://demomsa.com/api')
  const [language, setStateLanguage] = useState(globalLanguage)
  const translate = useMemo(
    () => new SettingsComponentTranslate(language),
    [language]
  )
  const translateUserMenuModal = useMemo(
    () => new UserMenuModalTranslate(language),
    [language]
  )
  useEffect(() => {
    const setHost = async () => {
      const host = await AsyncStorage.getItem('hosting')
      if (host) setHosting(host)
      axios.defaults.baseURL = hosting
    }
    setHost()
  }, [])
  const changeLanguageHandler = (itemValue) => {
    setStateLanguage(itemValue)
  }

  const changeHostingHandler = (hosting) => {
    setHosting(hosting)
  }
  const canselHandler = () => {
    setIsSettingsVisible((prev) => !prev)
    dispatch(setIsUserMenuModal(false))
  }
  const okButtonHandler = () => {
    AsyncStorage.setItem('lang', language)
    AsyncStorage.setItem('hosting', hosting)
    dispatch(setLanguage(language))
    axios.defaults.baseURL = hosting
    canselHandler()
  }
  return (
    <Modal animationType='slide' transparent={true} visible={true}>
      <View style={styles.container}>
        <View>
          <View style={styles.modalTitleBlock}>
            <Text style={styles.modalTitle}>
              {translate.getSettingsLabel()}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 25 }}>
            <SettingsComponentItem
              title={translate.getHostingLabel()}
              type={'input'}
              value={hosting}
              handler={changeHostingHandler}
            />
            <SettingsComponentItem
              title={translate.getLanguageLabel()}
              selectedObjects={[
                { label: translate.getEnglishLabel(), value: 'en' },
                { label: translate.getRussianLabel(), value: 'ru' }
              ]}
              value={language}
              handler={changeLanguageHandler}
              type={'picker'}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <OKButton handler={okButtonHandler} />
          <CancelButton handler={canselHandler} />
          <Text style={styles.versionText}>
            {translateUserMenuModal.getVersionLabel()}:{' '}
            {Application.nativeApplicationVersion}
          </Text>
        </View>
      </View>
    </Modal>
  )
}

export default SettingsComponent
