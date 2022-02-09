import React from 'react'
import { View, Text, StyleSheet, Modal, Pressable, Image } from 'react-native'
import done from '../assets/icons/done.png'
import cansel from '../assets/icons/cansel.png'
import { windowWidth } from '../Constants'

const CompliteWorkShift = ({ logOut, setIsModalVisible }) => {
  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={true}
      onRequestClose={() => console.log('Закрыто!')}
    >
      <View style={styles.container}>
        <Text style={styles.modalTitle}>
          Do you really want to complete your work shift?
        </Text>
        <View style={styles.buttonBlock}>
          <Pressable
            style={[styles.button, styles.greenButton]}
            onPress={() => logOut()}
          >
            <Image
              source={done}
              style={{ width: 30, height: 30, marginTop: -10 }}
            />
            <Text style={styles.buttonText}>Yes</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.redButton]}
            onPress={() => setIsModalVisible(false)}
          >
            <Image source={cansel} style={{ width: 20, height: 20 }} />
            <Text style={styles.buttonText}>No</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    paddingTop: windowWidth > 480 ? 95 : 120
  },
  modalTitle: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: windowWidth > 480 ? 30 : 22
  },
  buttonBlock: {
    marginTop: 80,
    flexDirection: windowWidth > 480 ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 295,
    height: 70,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  redButton: {
    backgroundColor: '#CF3B23'
  },
  greenButton: {
    marginRight: windowWidth > 480 ? 20 : 0,
    marginBottom: windowWidth > 480 ? 0 : 35,
    backgroundColor: '#009C6D'
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: 20,
    marginLeft: 15
  }
})

export default CompliteWorkShift
