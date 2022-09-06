import React, { useEffect, useMemo } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { windowWidth, htmlPrint } from '../../Constants'
import * as Print from 'expo-print'
import styles from '../../styles/Styles'
import qrcode from '../../lib/createImgTagQr/qrcode'
import componentStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveBarCode, setImgTag } from '../../redux/actionCreators'

const Order = ({ item, idx, icon }) => {
  const dispatch = useDispatch()
  const activeBarCode = useSelector((state) => state.main.activeBarCode)
  const ImgTag = useSelector((state) => state.order.ImgTag)

  const html = useMemo(
    () => htmlPrint(item._id, item.name, ImgTag),
    [item, ImgTag]
  )

  useEffect(() => {
    imgCreate()
  }, [item])

  const imgCreate = () => {
    if (item._id) {
      const qr = qrcode(0, 'L')
      qr.addData(item._id)
      qr.make()
      const res = qr.createImgTag()
      dispatch(setImgTag(res))
    }
  }

  const print = async () => {
    await Print.printAsync({
      html
    })
  }

  return (
    <View
      style={{
        ...styles.orderContainer,
        width: windowWidth > 480 ? 260 : windowWidth,
        borderRightWidth: windowWidth > 480 ? 0.5 : 0,
        borderRightColor: '#00000029'
      }}
    >
      <View style={componentStyles.qrItemName}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            dispatch(setActiveBarCode(!activeBarCode))
          }}
        >
          {windowWidth <= 480 ? (
            <QRCode value={item._id} size={40} logoMargin={2} />
          ) : (
            <Image source={icon} style={componentStyles.iconStyle}></Image>
          )}
        </TouchableOpacity>
        <View style={componentStyles.itemIdName}>
          <Text style={componentStyles.itemIdText}>{item._id}</Text>
          <Text
            style={componentStyles.itemNameText}
            numberOfLines={1}
            ellipsizeMode={'middle'}
          >
            {item.name}
          </Text>
        </View>
      </View>
      {windowWidth <= 480 && (
        <TouchableOpacity activeOpacity={0.5} onPress={() => print()}>
          <Image
            style={componentStyles.printIcon}
            source={require('../../assets/images/print.png')}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Order
