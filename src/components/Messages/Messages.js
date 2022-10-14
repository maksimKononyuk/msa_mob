import axios from 'axios'
import React, { useEffect, useMemo, useRef } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {
  setMessages,
  setErrorMessage,
  setIsErrorComponentVisible
} from '../../redux/actionCreators'
import MessageItem from '../MessageItem/MessageItem'
import { MessagesTranslale } from '../../Constants'
import NewMessagesItem from '../NewMessageItem/NewMessageItem'
import styles from './styles'

const Messages = () => {
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
        <NewMessagesItem messageScrollToEnd={messageScrollToEnd} />
      </View>
    </View>
  )
}

export default Messages
