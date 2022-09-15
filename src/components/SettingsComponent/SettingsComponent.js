import React, { useMemo, useState } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Picker
} from 'react-native'
import * as Application from 'expo-application'
import OKButton from '../OKButton/OKButton'
import CancelButton from '../CancelButton/CancelButton'
import SettingsComponentItem from '../SettingsComponentItem/SettingsComponentItem'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import {
  setLanguage,
  setIsUserMenuModal,
  setIsSettingsVisible
} from '../../redux/actionCreators'
import {
  SettingsComponentTranslate,
  UserMenuModalTranslate
} from '../../Constants'
import axios from 'axios'
import styles from './styles'

const SettingsComponent = () => {
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
  const changeLanguageHandler = (itemValue) => {
    setStateLanguage(itemValue)
  }

  const changeHostingHandler = (itemValue) => {
    setHosting(itemValue)
  }
  const canselHandler = () => {
    dispatch(setIsSettingsVisible())
    dispatch(setIsUserMenuModal(false))
  }
  const okButtonHandler = () => {
    AsyncStorage.setItem('lang', language)
    dispatch(setLanguage(language))
    console.log(axios.defaults.baseURL)
    axios.defaults.baseURL = hosting
    console.log(axios.defaults.baseURL)
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
              selectedObjects={[
                {
                  label: 'https://demomsa.com',
                  value: 'https://demomsa.com/api'
                }
              ]}
              selectedValue={hosting}
              handler={changeHostingHandler}
            />
            <SettingsComponentItem
              title={translate.getLanguageLabel()}
              selectedObjects={[
                { label: translate.getEnglishLabel(), value: 'en' },
                { label: translate.getRussianLabel(), value: 'ru' }
              ]}
              selectedValue={language}
              handler={changeLanguageHandler}
            />
          </View>
        </View>
        <View
          style={{
            paddingBottom: 10,
            alignItems: 'center',
            borderColor: '#bbb',
            borderTopWidth: 0.5
          }}
        >
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
