import React from 'react'
import {
  Modal,
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import SendDocumentImageItem from '../SendDocumentImageItem/SendDocumentImageItem'
import NewMessagesItem from '../NewMessageItem/NewMessageItem'
import CancelButton from '../CancelButton/CancelButton'
import styles from './styles'

const SendDocumentModal = ({
  chooseDocumentInDevice,
  filesForSend,
  sendHandler,
  canselModalHandler
}) => {
  return (
    <Modal visible={true} animationType='slide' transparent={true}>
      <View style={styles.container}>
        <View style={styles.visibleContainer}>
          <View style={styles.imageBlock}>
            {filesForSend.length > 1 ? (
              <ScrollView style={{ width: '100%' }}>
                {filesForSend.map((item, index) => (
                  <SendDocumentImageItem
                    fileName={item.name}
                    fileUri={item.uri}
                    key={index}
                  />
                ))}
              </ScrollView>
            ) : (
              <SendDocumentImageItem
                fileName={filesForSend[0].name}
                fileUri={filesForSend[0].uri}
                isOneItem={true}
              />
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.addButton}
            onPress={chooseDocumentInDevice}
          >
            <View style={styles.crossLine} />
            <View
              style={[styles.crossLine, { transform: [{ rotate: '90deg' }] }]}
            />
          </TouchableOpacity>
          <NewMessagesItem
            isInSendDocumentModal={true}
            sendHandler={sendHandler}
          />
          <View style={styles.canselContainer}>
            <CancelButton handler={canselModalHandler} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SendDocumentModal
