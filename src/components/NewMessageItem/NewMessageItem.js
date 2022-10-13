import axios from 'axios'
import React, { useMemo, useState, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  Text,
  Platform
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  setNewMessage,
  setErrorMessage,
  setIsKeyboardVisible,
  setIsErrorComponentVisible
} from '../../redux/actionCreators'
import * as DocumentPicker from 'expo-document-picker'
import sendButton from '../../assets/images/send.png'
import styles from './styles'
import { MessagesTranslale } from '../../Constants'
import SendDocumentModal from '../SendDocumentModal/SendDocumentModal'

const NewMessagesItem = ({ orderId, userId, messageScrollToEnd }) => {
  const dispatch = useDispatch()
  const newMessage = useSelector((state) => state.newMessageItem.newMessage)

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new MessagesTranslale(language))

  const [picker, setPicker] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [uri, setUri] = useState('')

  useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardDidShow', () => {
      messageScrollToEnd()
      dispatch(setIsKeyboardVisible())
    })
    const keyboardHide = Keyboard.addListener('keyboardDidHide', () => {
      dispatch(setIsKeyboardVisible())
    })

    return () => {
      keyboardShow.remove()
      keyboardHide.remove()
    }
  }, [])

  const messageButtonHandler = () => {
    Keyboard.dismiss()
    axios
      .post('order_worker_new_message', {
        _id: orderId,
        u_id: userId,
        message: newMessage
      })
      .then(() => dispatch(setNewMessage('')))
      .catch((err) => {
        console.log('Network error when sending a message ' + err)
        dispatch(setErrorMessage('when sending a message ' + err))
        // dispatch(setIsErrorComponentVisible(true))
      })
  }

  const changeUri = (uri) => {
    if (Platform.OS === 'android') return encodeURI(`file://${uri}`)
    else return uri
  }

  const chooseDocumentInDevice = async () => {
    const picker = await DocumentPicker.getDocumentAsync()
    if (picker.type === 'success') {
      setPicker(picker)
      setUri(changeUri(picker.uri))
      setIsModalVisible(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.filePickerAndInputContainer}>
        <TouchableOpacity activeOpacity={0.5} onPress={chooseDocumentInDevice}>
          <Text>{String.fromCodePoint(0x1f4ce)}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={translate.getNewMessageLabel()}
          value={newMessage}
          onChangeText={(text) => dispatch(setNewMessage(text))}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.sendButton}
        onPress={() => newMessage && messageButtonHandler()} // отправка сообщения только если тело сообщения не пустое
      >
        <Image source={sendButton} style={styles.sendButtonImage} />
      </TouchableOpacity>
      {isModalVisible && (
        <SendDocumentModal
          setIsModalVisible={setIsModalVisible}
          uri={uri}
          fileName={picker.name}
          orderId={orderId}
          userId={userId}
        />
      )}
    </View>
  )
}

export default NewMessagesItem
