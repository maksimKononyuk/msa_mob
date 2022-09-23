import React from 'react'
import { Modal, View, Text, Button, Image } from 'react-native'

const SendDocumentModal = ({ setIsModalVisible, uri }) => {
  const changeHandler = () => {
    setIsModalVisible(false)
  }

  const sendHandler = () => {}
  return (
    <Modal visible={true} animationType='slide' transparent={true}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: '#000000aa'
        }}
      >
        <View
          style={{
            width: '90%',
            height: '60%',
            backgroundColor: '#fff',
            borderRadius: 10,
            justifyContent: 'space-between',
            padding: 20
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '70%'
            }}
          >
            <Image
              style={{ width: '100%', height: '100%' }}
              resizeMode='contain'
              source={{ uri }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button title='Отмена' onPress={changeHandler}></Button>
            <Button title='Отправить' onPress={sendHandler}></Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SendDocumentModal
