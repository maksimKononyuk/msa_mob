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
import styles from './styles'

let massageInSendDocumentModal = ''

const Messages = () => {
  const OAuth_token =
    'OAuth y0_AgAAAABl96PzAAiSFgAAAADTZi6eBsur82fvRwOaFAf6oPfBjcRClOQ'

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

  // Получение сообщений каждую секунду
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

  // Скролл сообщений вниз при добавлении нового сообщения
  useEffect(() => {
    messageScrollToEnd()
  }, [messages.length])

  // Отправка сообщиния и ссылок на выбранные файлы на сервер MSA после получения этих ссылок
  useEffect(() => {
    if (uries.length === filesForSend.length && uries.length !== 0) {
      axios
        .post('order_worker_new_message', {
          _id: activeOrder._id,
          u_id: userId,
          message: massageInSendDocumentModal + '%iconLink%' + uries.join(',')
        })
        .then(() => (massageInSendDocumentModal = ''))
      setFilesForSend([])
      setUries([])
    }
  }, [uries.length])

  // Отправка сообщения без выбора файлов
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

  //исправление недочетов в библиотеке (неправильный путь к файлу)
  const changeUri = (uri) => {
    if (Platform.OS === 'android') return encodeURI(`file://${uri}`)
    else return uri
  }

  // Обработчие кнопки "Отмена" окна выбора файлов
  const canselModalHandler = () => {
    setIsModalVisible(false)
    setFilesForSend([])
  }

  // создание нужной директории на яндекс диске (одним PUT-запросом создается только одна папка)
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

  // Отправка одного файла и получение ссылки на файл
  const sendHandlerOneFile = async (dir, file) => {
    // Указание ссылки в яндекс диске с именем файла, куда будет загружен файл
    const urlDisk = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${dir}/${file.name}&overwrite=true`
    const urlForUploadRes = await fetch(urlDisk, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: OAuth_token
      }
    })
    const urlForUpload = await urlForUploadRes.json()

    // Загрузка самого файла по полученной ссылке для загрузки (При загрузке файла токен не требуется)
    await fetch(urlForUpload.href, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: file
    })

    // Получение ссылки на загруженный файл
    const hrefRes = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources/download?path=${dir}/${file.name}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: OAuth_token
        }
      }
    )
    // ссылка на загруженный файл в яндекс диск; передается в сообщении вместе с текстом сообщения для дальнейшего отображения картинки в блоке сообщения
    const href = await hrefRes.json()

    setUries((prev) => {
      prev.push(href.href)
      return prev
    })
  }

  // Обработчик кнопки "Отправить сообщение и файлы"
  const sendHandler = async () => {
    massageInSendDocumentModal = newMessage
    dispatch(setNewMessage(''))
    setIsModalVisible(false)
    const dir = await mkDir()
    for (let i = 0; i < filesForSend.length; i++) {
      sendHandlerOneFile(dir, filesForSend[i])
    }
  }

  // Обработчик кнопки выбора файлов
  const chooseDocumentInDevice = async () => {
    setIsModalVisible(false)
    const picker = await DocumentPicker.getDocumentAsync()
    if (picker.type === 'success') {
      const file = {
        name: picker.name,
        uri: changeUri(picker.uri) // исправление пути к файлу
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
        <View style={{ height: 70 }} />
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
