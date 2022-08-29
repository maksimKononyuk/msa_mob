import React from 'react'
import { View, ActivityIndicator, ScrollView, Text } from 'react-native'
import Order from '../Order/Order'
import { windowWidth } from '../../Constants'
import styles from '../../styles/Styles'
import componentStyles from './styles'
import { useSelector } from 'react-redux'

const Orders = () => {
  const orders = useSelector((state) => state.main.orders)
  return (
    <View style={[styles.shadow, componentStyles.container]}>
      {windowWidth <= 480 ? (
        <ScrollView
          horizontal={true}
          decelerationRate={0}
          snapToInterval={windowWidth}
          snapToAlignment={'center'}
          style={{ height: 60, width: windowWidth }}
        >
          {orders.length ? (
            orders.map((item, idx) => {
              return (
                <Order
                  item={item}
                  key={idx}
                  idx={idx}
                  // setEquipmentArr={setEquipmentArr}
                />
              )
            })
          ) : (
            <View
              style={{
                ...styles.center,
                flex: 1,
                width: windowWidth,
                backgroundColor: '#fff',
                paddingHorizontal: 10
              }}
            >
              <ActivityIndicator size='large' color='#000088' />
              <Text style={componentStyles.searchingText}>
                Searching for available orders
              </Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={{ width: windowWidth, flexDirection: 'row' }}>
          {orders.length ? (
            orders.map((item, idx) => {
              return (
                <Order
                  item={item}
                  key={idx}
                  idx={idx}
                  icon={
                    idx === 0
                      ? require('../../assets/icons/arrowMain.jpg')
                      : require('../../assets/icons/arrowNotMain.jpg')
                  }
                />
              )
            })
          ) : (
            <View
              style={{
                ...styles.center,
                flex: 1,
                paddingTop: 15,
                backgroundColor: '#fff'
              }}
            >
              <ActivityIndicator size='large' color='#000088' />
              <Text style={{ ...componentStyles.searchingText, padding: 15 }}>
                Searching for available orders
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export default Orders
