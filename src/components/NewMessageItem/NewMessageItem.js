import axios from 'axios'
import React, { useMemo, useState } from 'react'
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
  setIsErrorComponentVisible
} from '../../redux/actionCreators'
import * as DocumentPicker from 'expo-document-picker'
import sendButton from '../../assets/images/send.png'
import styles from './styles'
import { MessagesTranslale } from '../../Constants'
import SendDocumentModal from '../SendDocumentModal/SendDocumentModal'

const NewMessagesItem = ({ orderId, userId }) => {
  const dispatch = useDispatch()
  const newMessage = useSelector((state) => state.newMessageItem.newMessage)

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new MessagesTranslale(language))

  const [picker, setPicker] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [uri, setUri] = useState('')

  const buttonHendler = () => {
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
      setIsModalVisible(true)
      setUri(changeUri(picker.uri))
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ marginRight: 10 }}
          onPress={chooseDocumentInDevice}
        >
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
        onPress={() => newMessage && buttonHendler()} // отправка сообщения только если тело сообщения не пустое
      >
        <Image source={sendButton} style={styles.sendButtonImage} />
      </TouchableOpacity>
      {isModalVisible && (
        <SendDocumentModal setIsModalVisible={setIsModalVisible} uri={uri} />
      )}
    </View>
  )
}

export default NewMessagesItem
