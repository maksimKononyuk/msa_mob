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
import storage from '../../../firebase'

const NewMessagesItem = ({ orderId, userId, messageScrollToEnd }) => {
  const dispatch = useDispatch()
  const newMessage = useSelector((state) => state.newMessageItem.newMessage)

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new MessagesTranslale(language))

  const id = useSelector((state) => state.main.user.u_id)
  const [filesForSend, setFilesForSend] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [uries, setUries] = useState([])

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

  useEffect(() => {
    if (uries.length === filesForSend.length && uries.length !== 0) {
      axios
        .post('order_worker_new_message', {
          _id: orderId,
          u_id: userId,
          message: uries.join(',')
        })
        .then(() => {
          dispatch(setNewMessage(''))
          setFilesForSend([])
          setUries([])
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [uries.length])

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

  //исправление недочетов в библиотеке
  const changeUri = (uri) => {
    if (Platform.OS === 'android') return encodeURI(`file://${uri}`)
    else return uri
  }

  const canselModalHandler = () => {
    setIsModalVisible(false)
    setFilesForSend([])
  }

  const fileToBiteStream = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function (e) {
        reject(new TypeError('Network request failed'))
      }
      xhr.responseType = 'blob'
      xhr.open('GET', uri, true)
      xhr.send(null)
    })
  }

  const sendHandlerOneFile = async (name, uri) => {
    const blob = await fileToBiteStream(uri)
    const storageRef = storage.ref(`${id}/emploees/${name}`).put(blob)
    storageRef.on(
      'state_changed',
      (snapshot) => {
        uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (err) => {
        console.log(err)
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          setUries((prev) => {
            prev.push(url)
            return prev
          })
        })
      }
    )
  }

  const sendHandler = async () => {
    for (let i = 0; i < filesForSend.length; i++) {
      await sendHandlerOneFile(filesForSend[i].name, filesForSend[i].uri)
    }
    setIsModalVisible(false)
  }

  const chooseDocumentInDevice = async () => {
    setIsModalVisible(false)
    const picker = await DocumentPicker.getDocumentAsync()
    if (picker.type === 'success') {
      const file = {
        name: picker.name,
        uri: changeUri(picker.uri)
      }
      setFilesForSend((prev) => {
        prev.push(file)
        return prev
      })
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
          chooseDocumentInDevice={chooseDocumentInDevice}
          filesForSend={filesForSend}
          sendHandler={sendHandler}
          canselModalHandler={canselModalHandler}
        />
      )}
    </View>
  )
}

export default NewMessagesItem
