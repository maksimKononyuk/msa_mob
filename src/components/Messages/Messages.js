import axios from 'axios'
import React, { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {
  setMessages,
  setErrorMessage,
  setIsErrorComponentVisible
} from '../../redux/actionCreators'
import MessageItem from '../MessageItem/MessageItem'
import NewMessagesItem from '../NewMessageItem/NewMessageItem'
import styles from './styles'

const Messages = () => {
  const dispatch = useDispatch()
  const activeOrder = useSelector((state) => state.main.activeOrder)
  const userName = useSelector((state) => state.main.user.name)
  const userId = useSelector((state) => state.main.user.u_id)
  const messages = useSelector((state) => state.messages.messages)

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
          dispatch(setIsErrorComponentVisible(true))
        })
    }, 1000)
    return () => {
      clearInterval(getMessage)
    }
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        {messages.length === 0 ? (
          <Text style={styles.notMessageText}>You have not messages</Text>
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
        <NewMessagesItem orderId={activeOrder._id} userId={userId} />
      </View>
    </View>
  )
}

export default Messages
