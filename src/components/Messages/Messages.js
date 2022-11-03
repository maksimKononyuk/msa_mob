import axios from 'axios'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, ScrollView, Platform, Keyboard } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as DocumentPicker from 'expo-document-picker'
import {
  setMessages,
  setErrorMessage,
  setNewMessage,
  setIsErrorComponentVisible
} from '../../redux/actionCreators'
import MessageItem from '../MessageItem/MessageItem'
import { MessagesTranslale } from '../../Constants'
import NewMessagesItem from '../NewMessageItem/NewMessageItem'
import SendDocumentModal from '../SendDocumentModal/SendDocumentModal'
// import storage from '../../../firebase'
import styles from './styles'

const Messages = () => {
  const OAuth_token =
    'OAuth y0_AgAAAAAQghR9AAiMSQAAAADS296d02g2EPl7SsWjQ9EqWLwnq3R9u7c'

  const dispatch = useDispatch()
  const activeOrder = useSelector((state) => state.main.activeOrder)
  const userId = useSelector((state) => state.main.user?.u_id)
  const messages = useSelector((state) => state.messages.messages)

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new MessagesTranslale(language), [language])

  const messageScroll = useRef(null)

  const messageScrollToEnd = () => {
    messageScroll.current.scrollToEnd()
  }

  const newMessage = useSelector((state) => state.newMessageItem.newMessage)
  const id = useSelector((state) => state.main.user.u_id)
  const [filesForSend, setFilesForSend] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [uries, setUries] = useState([])

  useEffect(() => {
    const getMessage = setInterval(() => {
      axios
        .get(`order_worker_message/${activeOrder._id}`)
        .then((res) => {
          dispatch(setMessages(res.data))
        })
        .catch((err) => {
          console.log('Network error when receiving messages ' + err)
          dispatch(setErrorMessage('when receiving messages ' + err))
          // dispatch(setIsErrorComponentVisible(true))
        })
    }, 1000)
    return () => {
      clearInterval(getMessage)
    }
  }, [])

  useEffect(() => {
    if (uries.length === filesForSend.length && uries.length !== 0) {
      axios.post('order_worker_new_message', {
        _id: activeOrder._id,
        u_id: userId,
        message: newMessage + '%iconLink%' + uries.join(',')
      })
      // .then(() => {
      //   dispatch(setNewMessage(''))
      //   setFilesForSend([])
      //   setUries([])
      // })
      // .catch((err) => {
      //   console.log(err)
      // })
      dispatch(setNewMessage(''))
      setFilesForSend([])
      setUries([])
    }
  }, [uries.length])

  const messageButtonHandler = () => {
    Keyboard.dismiss()
    axios
      .post('order_worker_new_message', {
        _id: activeOrder._id,
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

  const mkDir = async () => {
    await fetch(`https://cloud-api.yandex.net/v1/disk/resources?path=/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: OAuth_token
      }
    })
    await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=/${id}/emploees/`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: OAuth_token
        }
      }
    )
    return `${id}/emploees`
  }

  const sendHandlerOneFile = async (dir, file) => {
    const urlDisk = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${dir}/${file.name}&overwrite=true`
    const urlForUploadRes = await fetch(urlDisk, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'OAuth y0_AgAAAAAQghR9AAiMSQAAAADS296d02g2EPl7SsWjQ9EqWLwnq3R9u7c'
      }
    })
    const urlForUpload = await urlForUploadRes.json()
    await fetch(urlForUpload.href, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: file
    })
    const hrefRes = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources/download?path=${dir}/${file.name}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'OAuth y0_AgAAAAAQghR9AAiMSQAAAADS296d02g2EPl7SsWjQ9EqWLwnq3R9u7c'
        }
      }
    )
    const href = await hrefRes.json()
    setUries((prev) => {
      prev.push(href.href)
      return prev
    })
  }

  const sendHandler = async () => {
    setIsModalVisible(false)
    const dir = await mkDir()
    for (let i = 0; i < filesForSend.length; i++) {
      sendHandlerOneFile(dir, filesForSend[i])
    }
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
      <ScrollView style={styles.scroll} ref={messageScroll}>
        {messages.length === 0 ? (
          <Text style={styles.noMessageText}>{translate.getInfoLabel()}</Text>
        ) : (
          messages.map((item, index) => {
            return (
              <MessageItem
                key={index}
                isYourMessage={userId === item.w_id}
                userName={item.worker}
                operation={activeOrder.description.name}
                date={item.m_data}
                message={item.message}
              />
            )
          })
        )}
        <View style={{ height: 80 }} />
      </ScrollView>
      <View style={styles.newMessageItemContainer}>
        <NewMessagesItem
          chooseDocumentInDevice={chooseDocumentInDevice}
          messageScrollToEnd={messageScrollToEnd}
          messageButtonHandler={messageButtonHandler}
        />
      </View>
      {isModalVisible && (
        <SendDocumentModal
          chooseDocumentInDevice={chooseDocumentInDevice}
          filesForSend={filesForSend}
          sendHandler={sendHandler}
          canselModalHandler={canselModalHandler}
          messageButtonHandler={messageButtonHandler}
        />
      )}
    </View>
  )
}

export default Messages
