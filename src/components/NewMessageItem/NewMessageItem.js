import axios from 'axios'
import React, { useMemo } from 'react'
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  setNewMessage,
  setErrorMessage,
  setIsErrorComponentVisible
} from '../../redux/actionCreators'
import sendButton from '../../assets/images/send.png'
import styles from './styles'
import { MessagesTranslale } from '../../Constants'

const NewMessagesItem = ({ orderId, userId }) => {
  const dispatch = useDispatch()
  const newMessage = useSelector((state) => state.newMessageItem.newMessage)

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new MessagesTranslale(language))

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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={translate.getNewMessageLabel()}
        value={newMessage}
        onChangeText={(text) => dispatch(setNewMessage(text))}
      />
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.sendButton}
        onPress={() => newMessage && buttonHendler()} // отправка сообщения только если тело сообщения не пустое
      >
        <Image source={sendButton} style={styles.sendButtonImage} />
      </TouchableOpacity>
    </View>
  )
}

export default NewMessagesItem
