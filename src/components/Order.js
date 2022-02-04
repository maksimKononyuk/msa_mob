import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { windowWidth } from '../Constants'

import styles from '../styles/Styles'

const Order = ({ item, idx, activeBarCode, setActiveBarCode, icon }) => {
  const print = () => {
    console.log('print')
  }

  return (
    <View
      style={{
        ...styles.orderContainer,
        backgroundColor: idx === 0 ? '#FFFFFF' : '#F8F8F8',
        width: windowWidth > 480 && 260,
        borderRightWidth: windowWidth > 480 ? 1 : 0,
        borderRightColor: '#00000029'
      }}
    >
      <Pressable
        onPress={() => {
          activeBarCode ? setActiveBarCode(null) : setActiveBarCode(item._id)
        }}
      >
        {windowWidth <= 480 ? (
          <QRCode value={item._id} size={40} logoMargin={2} />
        ) : (
          <Image source={icon}></Image>
        )}
      </Pressable>
      <View
        style={{
          ...styles.center,
          flexDirection: 'column',
          width: windowWidth <= 480 ? '70%' : '90%'
        }}
      >
        <Text style={{ fontFamily: 'Roboto', color: '#8F8F8F' }}>
          {item._id}
        </Text>
        <Text
          style={{ fontFamily: 'Roboto', fontSize: 16 }}
          numberOfLines={2}
          ellipsizeMode={'middle'}
        >
          {item.name}
        </Text>
      </View>
      {windowWidth <= 480 && (
        <Pressable>
          <Image
            onPress={() => print()}
            style={{ width: 40, height: 40 }}
            source={require('../assets/images/print.png')}
          />
        </Pressable>
      )}
    </View>
  )
}

export default Order
