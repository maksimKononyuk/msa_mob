import React from 'react'
import { Modal, View, Text, Button, Image } from 'react-native'
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
            {filesForSend[filesForSend.length - 1].name
              .toLowerCase()
              .includes('jpg') ||
            filesForSend[filesForSend.length - 1].name
              .toLowerCase()
              .includes('jpeg') ||
            filesForSend[filesForSend.length - 1].name
              .toLowerCase()
              .includes('png') ? (
              <Image
                style={styles.image}
                resizeMode='contain'
                source={{ uri: filesForSend[filesForSend.length - 1].uri }}
              />
            ) : (
              <View style={styles.fileContainer}>
                <Image
                  style={styles.image}
                  resizeMode='contain'
                  source={require('../../assets/icons/file.png')}
                />
                <Text>
                  {
                    filesForSend[filesForSend.length - 1].name
                      .split('.')
                      .reverse()[0]
                  }
                </Text>
              </View>
            )}
          </View>
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
