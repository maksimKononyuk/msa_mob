import axios from 'axios'
import React, { useMemo, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  Text
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setNewMessage, setIsKeyboardVisible } from '../../redux/actionCreators'
import sendButton from '../../assets/images/send.png'
import styles from './styles'
import { MessagesTranslale } from '../../Constants'

const NewMessagesItem = ({
  messageScrollToEnd,
  isInSendDocumentModal,
  chooseDocumentInDevice,
  messageButtonHandler,
  sendHandler
}) => {
  const dispatch = useDispatch()
  const newMessage = useSelector((state) => state.newMessageItem.newMessage)

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new MessagesTranslale(language))

  useEffect(() => {
    if (!isInSendDocumentModal) {
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
    }
  }, [])

  const buttonHandler = () => {
    if (isInSendDocumentModal) sendHandler()
    else newMessage && messageButtonHandler() // отправка сообщения только если тело сообщения не пустое
  }

  return (
    <View style={styles.container}>
      <View style={styles.filePickerAndInputContainer}>
        {!isInSendDocumentModal && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={chooseDocumentInDevice}
          >
            <Text>{String.fromCodePoint(0x1f4ce)}</Text>
          </TouchableOpacity>
        )}
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
        onPress={buttonHandler}
      >
        <Image source={sendButton} style={styles.sendButtonImage} />
      </TouchableOpacity>
    </View>
  )
}

export default NewMessagesItem
