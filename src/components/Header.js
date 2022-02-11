import React, { useState } from 'react'
import { View, Text, Image, Alert, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from '../styles/Styles'
import CompleteWorkShift from './CompleteWorkShiftModal'
import UsersMenuModal from './UsersMenuModal'

const Header = ({ logOut, userName }) => {
  const [isModalWorkShiftVisible, setIsModalWorkShiftVisible] = useState(false)
  const [isUserMenuModal, setIsUserMenuModal] = useState(false)
  const tryCompleteWorkShift = () => {
    // Alert.alert(
    //   'MSA Mobile',
    //   'Do you really want to complete your work shift?',
    //   [
    //     {
    //       text: 'Cancel',
    //       style: 'cancel'
    //     },
    //     { text: 'Yes', onPress: () => logOut() }
    //   ],
    //   { cancelable: false }
    // )
    setIsModalWorkShiftVisible(true)
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.center}>
        <Image
          style={{ width: 24, height: 23 }}
          source={require('../assets/images/person.png')}
        />
        <Text style={styles.headerName}>{userName}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable
          style={{
            width: 20,
            height: 8,
            justifyContent: 'space-between',
            marginRight: 20
          }}
          onPress={() => setIsUserMenuModal(true)}
        >
          <View style={{ backgroundColor: '#fff', height: 2 }}></View>
          <View style={{ backgroundColor: '#fff', height: 2 }}></View>
        </Pressable>
        {/* <Icon.Button
          name='exit-outline'
          color={'#000'}
          backgroundColor={'#fff'}
          style={{ padding: 2, marginRight: -10 }}
          size={20}
          onPress={() => tryCompleteWorkShift()}
        /> */}
      </View>
      {isModalWorkShiftVisible && (
        <CompleteWorkShift
          logOut={logOut}
          setIsModalVisible={setIsModalWorkShiftVisible}
        />
      )}
      {isUserMenuModal && (
        <UsersMenuModal setModalVisible={setIsUserMenuModal} logOut={logOut} />
      )}
    </View>
  )
}

export default Header
