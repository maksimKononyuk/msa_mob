import React from 'react'
import axios from 'axios'
import { Modal, View, Text, Button, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setNewMessage } from '../../redux/actionCreators'
import styles from './styles'
import storage from '../../../firebase'

const SendDocumentModal = ({
  setIsModalVisible,
  uri,
  fileName,
  orderId,
  userId
}) => {
  const dispatch = useDispatch()
  const id = useSelector((state) => state.main.user.u_id)
  const changeHandler = () => {
    setIsModalVisible(false)
  }

  const sendHandler = async () => {
    const blob = await new Promise((resolve, reject) => {
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
    const storageRef = storage.ref(`${id}/emploees/${fileName}`).put(blob)
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
          axios
            .post('order_worker_new_message', {
              _id: orderId,
              u_id: userId,
              message: url
            })
            .then(() => dispatch(setNewMessage('')))
            .catch((err) => {
              console.log(err)
            })
        })
      }
    )
    setIsModalVisible(false)
  }
  return (
    <Modal visible={true} animationType='slide' transparent={true}>
      <View style={styles.container}>
        <View style={styles.visibleContainer}>
          <View style={styles.imageBlock}>
            {fileName.toLowerCase().includes('jpg') ||
            fileName.toLowerCase().includes('jpeg') ||
            fileName.toLowerCase().includes('png') ? (
              <Image
                style={styles.image}
                resizeMode='contain'
                source={{ uri }}
              />
            ) : (
              <View style={styles.fileContainer}>
                <Image
                  style={styles.image}
                  resizeMode='contain'
                  source={require('../../assets/icons/file.png')}
                />
                <Text>{fileName.split('.').reverse()[0]}</Text>
              </View>
            )}
          </View>
          <View style={styles.buttonsBlock}>
            <Button title='Отмена' onPress={changeHandler}></Button>
            <Button title='Отправить' onPress={sendHandler}></Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SendDocumentModal
