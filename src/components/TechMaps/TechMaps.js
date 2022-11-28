import axios from 'axios'
import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions
} from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import AppIntroSlider from 'react-native-app-intro-slider'
import ImageZoom from 'react-native-image-pan-zoom'
import { Video } from 'expo-av'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  setMapsArr,
  setModalVisibleTechMaps,
  setItem,
  setErrorMessage,
  setIsErrorComponentVisible
} from '../../redux/actionCreators'

const TechMaps = () => {
  const dispatch = useDispatch()
  const operationId = useSelector(
    (state) => state.main.activeOrder?.description?.o_id
  )
  const mapsArr = useSelector((state) => state.TechMaps.mapsArr)
  const modalVisible = useSelector((state) => state.TechMaps.modalVisible)
  const item = useSelector((state) => state.TechMaps.item)

  useEffect(() => {
    axios
      .get(`order_worker_techmap/${operationId}`)
      .then((response) => {
        dispatch(setMapsArr(response.data[0].technical_maps))
      })
      .catch((err) => {
        console.log('Network error when receiving technical maps ' + err)
        dispatch(setErrorMessage('when receiving technical maps ' + err))
        // dispatch(setIsErrorComponentVisible(true))
      })
  }, [])

  const fullScreenHandler = async () => {
    if ((await ScreenOrientation.getOrientationLockAsync()) === 3)
      ScreenOrientation.unlockAsync()
    else ScreenOrientation.lockAsync(3)
  }

  const renderItem = ({ item }) => {
    let isVideo = false
    if (item.file_name.substr(item.file_name.lastIndexOf('.') + 1) === 'mp4')
      isVideo = true
    return (
      <View style={styles.container}>
        <Text style={styles.mapName}>{item.name}</Text>
        {isVideo ? (
          <Video
            style={{ height: '90%' }}
            useNativeControls
            source={{
              // uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
              uri: item.file_url
            }}
            resizeMode='contain'
            onFullscreenUpdate={fullScreenHandler}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              dispatch(setItem(item))
              dispatch(setModalVisibleTechMaps(true))
            }}
          >
            <Image
              source={{ uri: item.file_url }}
              style={{ height: '100%' }}
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    )
  }

  return (
    <View
      style={[styles.container, { height: '90%', justifyContent: 'center' }]}
    >
      {mapsArr?.length > 0 ? (
        <AppIntroSlider
          keyExtractor={(item, index) => 'key' + index}
          renderItem={renderItem}
          data={mapsArr}
          showNextButton={false}
          dotStyle={{ backgroundColor: '#DFDFDF' }}
          activeDotStyle={{ backgroundColor: '#009C6D' }}
        />
      ) : (
        <ActivityIndicator size='large' color='#000088' />
      )}
      <Modal visible={modalVisible} transparent={false}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.closeModalButton}
          onPress={() => {
            dispatch(setModalVisibleTechMaps(false))
          }}
        >
          <View
            style={[
              styles.closeModalButtonLeftLine,
              styles.closeModalButtonLine
            ]}
          />
          <View
            style={[
              styles.closeModalButtonRightLine,
              styles.closeModalButtonLine
            ]}
          />
        </TouchableOpacity>
        {/* {item?.file_name.split('.').pop() == 'jpg' && ( */}
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').width / 1.43}
        >
          <Image
            source={{ uri: item?.file_url }}
            style={{
              height: Dimensions.get('window').width / 1.43,
              width: Dimensions.get('window').width
            }}
            resizeMode={'contain'}
          />
        </ImageZoom>
      </Modal>
    </View>
  )
}

export default TechMaps
