import React, { useMemo } from 'react'
import { View, Text, Image } from 'react-native'
import avatar from '../../assets/images/avatar_local.png'
import styles from './styles'
import { OperationContainerTranslate } from '../../Constants'
import { useSelector } from 'react-redux'
import MessageFile from '../MessageFile/MessageFile'

const MessageItem = ({ isYourMessage, userName, operation, date, message }) => {
  const language = useSelector((state) => state.main.language)
  const translate = useMemo(
    () => new OperationContainerTranslate(language),
    [language]
  )
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isYourMessage ? '#0080FF' : '#F5F5F5',
          borderTopLeftRadius: isYourMessage ? 14 : 0,
          borderTopRightRadius: isYourMessage ? 0 : 14
        }
      ]}
    >
      <View style={styles.infoBlock}>
        <View style={styles.upPart}>
          <View style={styles.logoAndUserName}>
            <Image source={avatar} style={styles.avatar} />
            <Text style={[styles.text, isYourMessage && { color: '#ffffff' }]}>
              {userName}
            </Text>
          </View>
          <View>
            <Text style={[styles.text, isYourMessage && { color: '#ffffff' }]}>
              {new Date(date).toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={styles.operationBlock}>
          <Text
            style={[
              styles.text,
              styles.operationText,
              isYourMessage && { color: '#ffffff' }
            ]}
          >
            {translate.getTitleLabel()}: {operation}
          </Text>
        </View>
      </View>
      {message.includes('https://') ? (
        <View style={styles.fileIconsContainer}>
          {message.split(',').map((item, index) => (
            <MessageFile uri={item} key={index} />
          ))}
        </View>
      ) : (
        <Text style={[styles.message, isYourMessage && { color: '#ffffff' }]}>
          {message}
        </Text>
      )}
    </View>
  )
}

export default MessageItem
