import React from 'react'
import { Modal, View, Text, Button, Image, ScrollView } from 'react-native'
import SendDocumentImageItem from '../SendDocumentImageItem/SendDocumentImageItem'
import NewMessagesItem from '../NewMessageItem/NewMessageItem'
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
          <NewMessagesItem isInSendDocumentModal={true} />
          <View style={styles.buttonsBlock}>
            <Button title='Отмена' onPress={canselModalHandler}></Button>
            <Button title='Отправить' onPress={sendHandler}></Button>
            <Button title='Добавить' onPress={chooseDocumentInDevice}></Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SendDocumentModal
