import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import JSONTree from 'react-native-json-tree'
import componentStyles from './styles'

import styles from '../../styles/Styles'
import { windowWidth, jsonTreeTheme } from '../../Constants'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveBarCode } from '../../redux/actionCreators'

const ActiveOrder = () => {
  const dispatch = useDispatch()
  const orderStarted = useSelector((state) => state.main.orderStarted)
  const order = useSelector((state) => state.main.activeOrder)

  return (
    <View
      style={[
        styles.container,
        {
          alignItems: windowWidth <= 480 ? 'center' : 'flex-start',
          paddingHorizontal: 5
        }
      ]}
    >
      {orderStarted ? (
        <ScrollView style={{ width: '100%' }}>
          <JSONTree
            data={order?.order?.list || {}}
            theme={{
              extend: jsonTreeTheme,
              nestedNodeLabel: ({ style }, nodeType, expanded) => ({
                style: {
                  ...style,
                  textTransform: expanded ? 'uppercase' : style.textTransform
                }
              })
            }}
            hideRoot={true}
            invertTheme={false}
            getItemString={() => <Text></Text>}
            labelRenderer={([label]) => (
              <Text style={componentStyles.labelText}>{label}:</Text>
            )}
            valueRenderer={(raw) => (
              <Text style={componentStyles.labelText}>{raw}</Text>
            )}
          />
        </ScrollView>
      ) : (
        <View style={componentStyles.qrContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{}}
            onPress={() => {
              dispatch(setActiveBarCode(true))
            }}
          >
            <Image
              style={componentStyles.qrcodeIcon}
              source={require('../../assets/images/qrcodeIcon.png')}
            />
          </TouchableOpacity>
          <Text style={componentStyles.mainText}>
            Complete order information will appear after clicking "START"
          </Text>
        </View>
      )}
    </View>
  )
}

export default ActiveOrder
