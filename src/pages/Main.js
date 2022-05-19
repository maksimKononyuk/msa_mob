import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Image,
  Modal
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import * as Updates from 'expo-updates'
import { Stopwatch } from '../lib/react-native-stopwatch-timer'

import Header from '../components/Header/Header'
import Order from '../components/Order/Order'
import MenuItem from '../components/MenuItem/MenuItem'
import ActiveOrder from '../components/ActiveOrder/ActiveOrder'
import BarCode from '../components/BarCode/BarCode'
import TechMaps from '../components/TechMaps/TechMaps'
import ActiveOrderHeader from '../components/Adaptive/ActiveOrderHeader'
import RightBlock from '../components/Adaptive/RightBlock'
import OrderCancelModal from '../components/OrderCancelModal/OrderCancelModal'
import Messages from '../components/Messages/Messages'
import OperationContainer from '../components/OperationContainer/OperationContainer'
import styles from '../styles/Styles'
import { carouselItems, windowWidth, options } from '../Constants'
import arrowMain from '../assets/icons/arrowMain.jpg'
import arrowNotMain from '../assets/icons/arrowNotMain.jpg'
import okButton from '../assets/images/ok.png'
import closeButton from '../assets/images/close.png'
import Materials from '../components/Materials/Materials'
import Equipment from '../components/Equipment/Equipment'
import * as TaskManager from 'expo-task-manager'
import * as BackgroundFetch from 'expo-background-fetch'
import * as Notifications from 'expo-notifications'

// Счетчик заказов

let ordersCount = 0

///////

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'New order 📬',
      body: 'You have a new order'
    },
    trigger: { seconds: 2 }
  })
}

const BACKGROUND_FETCH_TASK = 'background-fetch'

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const user = await JSON.parse(await AsyncStorage.getItem('user'))
  axios.get(`order_worker/${user?.u_id}`).then((res) => {
    if (res.data.length > ordersCount) {
      schedulePushNotification()
      ordersCount = res.data.length
    }
  })

  return 2
})

function Main({ route }) {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])

  const [isPlaySound, setIsPlaySound] = useState(false)

  const [activeOrder, setActiveOrder] = useState(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [activeBarCode, setActiveBarCode] = useState(false)
  const [orderStarted, setOrderStarted] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [orderCancelModalVisible, setOrderCancelModalVisible] = useState(false)
  const [previousOperation, setPreviousOperation] = useState([])
  const [isStartConfirmation, setIsStartConfirmation] = useState(false)
  const [isFinishConfirmation, setIsFinishConfirmation] = useState(false)
  const [materialsArr, setMaterialsArr] = useState([])
  const [showMaterialsComponent, setShowMaterialsComponent] = useState(false)
  const [equipmentArr, setEquipmentArr] = useState([])
  const [isEquipmentVisible, setIsEquipmentVisible] = useState(true)
  const [selectedItems, setSelectedItems] = useState([])
  const [finishOrderParams, setFinishOrderParams] = useState(null)

  //////////////////////Для BackgroundFetch

  const [isRegistered, setIsRegistered] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    toggleFetchTask()
  }, [])

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync()
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    )
    setStatus(status)
    setIsRegistered(isRegistered)
  }

  const toggleFetchTask = async () => {
    await registerBackgroundFetchAsync()
    checkStatusAsync()
  }

  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 1, // 1 minute
      stopOnTerminate: false, // android only,
      startOnBoot: true // android only
    })
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const carousel = useRef()

  const logOut = async () => {
    axios
      .put('worker_in', {
        _id: user.u_id,
        at_work: false
      })
      .then(async () => {
        await AsyncStorage.clear()
        // navigation.navigate('Auth')
        Updates.reloadAsync()
      })
  }

  const getOrders = (user) => {
    axios.get(`order_worker/${user.u_id}`).then((res) => {
      setOrders(res.data)
      if (res.data.length > ordersCount) {
        setIsPlaySound(true)
        ordersCount = res.data.length
      }
      if (res.data.length) {
        getOrderInfo(res.data[0]._id, user.u_id)
        getPreviousOperation(user)
      }
    })
  }

  const getPreviousOperation = (user) => {
    axios.get(`order_prev_operation/${user.u_id}`).then((res) => {
      setPreviousOperation(res.data)
    })
  }

  const getOrderInfo = (activeOrderId, userId) => {
    axios.get(`order_id_worker/${activeOrderId}/${userId}`).then((res) => {
      setActiveOrder(res.data[0])
    })
  }

  const startOrder = () => {
    setIsEquipmentVisible(false)
    axios
      .put('order_worker_start', {
        order_id: activeOrder?._id,
        stream_id: activeOrder?.s_id,
        operation_id: activeOrder?.operation?._id
      })
      .then(() => {
        setIsStartConfirmation(false)
        setOrderStarted(true)
        const checkCancelOrder = setInterval(async () => {
          await axios
            .get(`order_worker_active/${user.u_id}`)
            .then(async (res) => {
              if (res.data.length) {
                clearInterval(checkCancelOrder)
                // Alert.alert('MSA Mobile', 'Your order has been cancelled.')
                setOrderCancelModalVisible(true)
                setOrderStarted(false)
              }
            })
        }, 10000)
      })
      .catch((err) => console.error(err))
    axios.put(
      'equipment_busy',
      selectedItems.map((item) => ({
        _id: item,
        occupied: true
      }))
    )
  }

  const finishOrder = (nextOperationId, relationId) => {
    axios
      .put('order_worker_finish', {
        order_id: activeOrder?._id,
        stream_id: activeOrder?.s_id,
        next_operation_id: nextOperationId,
        current_operation_id: activeOrder?.operation?._id,
        relation_id: relationId,
        function: materialsArr
      })
      .then(() => {
        setOrderStarted(false)
        setModalVisible(false)
        // обновляем список заказов после завершения активной операции
        Alert.alert('MSA Mobile', 'Your operation has been completed.')
      })
      .catch((err) => console.error(err))
    axios.put(
      'equipment_busy',
      selectedItems.map((item) => ({
        _id: item,
        occupied: false
      }))
    )
  }

  useEffect(() => {
    async function getData() {
      const tempUser = JSON.parse(await AsyncStorage.getItem('user'))
      setUser(tempUser)

      setInterval(() => {
        getOrders(tempUser)
      }, 2000)

      let checkLogout = setInterval(async () => {
        await axios.get(`worker_logout/${tempUser.u_id}`).then(async (res) => {
          if (res.data[0].at_work === false) {
            clearInterval(checkLogout)
            await AsyncStorage.clear()
            // navigation.navigate('Auth')
            Updates.reloadAsync()
            Alert.alert(
              'MSA Mobile',
              'You have been logged out by the administrator.'
            )
          }
        })
      }, 10000)
    }

    getData()
  }, [])

  useEffect(() => {
    if (modalVisible) setIsFinishConfirmation(false)
  }, [modalVisible])

  const maretialsRequest = (index) => {
    if (activeOrder) {
      axios
        .get(`order_id_worker/${activeOrder._id}/${user?.u_id}/`)
        .then((res) =>
          setMaterialsArr(res.data[0].operation.relation[index].function)
        )
    }
  }

  const renderCarouselItem = ({ item, index }) => {
    return (
      <MenuItem
        item={item}
        index={index}
        activeIndex={activeIndex}
        carousel={carousel.current}
      />
    )
  }

  const equipmentRequest = (o_id) => {
    axios.get(`equipment_o_id/${o_id}`).then((res) => {
      setEquipmentArr(res.data)
    })
  }

  useEffect(() => {
    if (activeOrder) {
      equipmentRequest(activeOrder.description.o_id)
    }
  }, [activeOrder?.operation._id])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <StatusBar style='light' translucent={false} />
      <Header logOut={logOut} userName={route.params.userName} />
      {!activeBarCode && (
        <View style={{ ...styles.shadow, height: 80 }}>
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
                      activeBarCode={activeBarCode}
                      setActiveBarCode={setActiveBarCode}
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
                  <Text
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 18,
                      padding: 5
                    }}
                  >
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
                      activeBarCode={activeBarCode}
                      setActiveBarCode={setActiveBarCode}
                      icon={idx === 0 ? arrowMain : arrowNotMain}
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
                  <Text
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 18,
                      padding: 15
                    }}
                  >
                    Searching for available orders
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      )}
      <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
        <View style={{ flex: 3 }}>
          {!activeBarCode && (
            <View
              style={{
                height: 60,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#F5F5F5'
              }}
            >
              <Carousel
                ref={carousel}
                firstItem={1}
                activeSlideOffset={0}
                swipeThreshold={0}
                callbackOffsetMargin={20}
                data={carouselItems}
                sliderWidth={
                  windowWidth > 480 ? windowWidth * 0.75 : windowWidth
                }
                itemWidth={
                  windowWidth > 480 ? windowWidth * 0.25 : windowWidth / 3
                }
                sliderHeight={60}
                itemHeight={60}
                renderItem={renderCarouselItem}
                onSnapToItem={(index) => setActiveIndex(index)}
              />
            </View>
          )}
          {activeIndex === 0 && orders.length && !activeBarCode ? (
            <Messages orderId={activeOrder?._id} userId={user.u_id} />
          ) : null}
          {activeIndex === 1 && orders.length && !activeBarCode ? (
            <>
              {windowWidth > 480 && <ActiveOrderHeader item={orders[0]} />}
              {equipmentArr.length === 0 || !isEquipmentVisible ? (
                <ActiveOrder
                  isPlaySound={isPlaySound}
                  setIsPlaySound={setIsPlaySound}
                  order={activeOrder}
                  orderStarted={orderStarted}
                  setActiveBarCode={setActiveBarCode}
                  schedulePushNotification={schedulePushNotification}
                />
              ) : (
                <Equipment
                  equipmentArr={equipmentArr}
                  setSelectedItems={setSelectedItems}
                  o_id={activeOrder?.description.o_id}
                  equipmentRequest={equipmentRequest}
                />
              )}
            </>
          ) : null}
          {activeIndex === 2 && !activeBarCode ? (
            <TechMaps operationId={activeOrder?.description?.o_id} />
          ) : null}
          {activeBarCode && orders.length ? (
            <BarCode
              activeBarCode={activeBarCode}
              setActiveBarCode={setActiveBarCode}
              orders={orders}
            />
          ) : null}
        </View>
        {windowWidth > 480 && (
          <View style={{ flex: 1 }}>
            <RightBlock
              order={activeOrder}
              orderStarted={orderStarted}
              setOrderStarted={setOrderStarted}
              startOrder={startOrder}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              previousOperation={previousOperation}
            />
          </View>
        )}
      </View>
      {windowWidth <= 480 && orders.length && !activeBarCode ? (
        <View style={{ width: '100%' }}>
          <OperationContainer order={activeOrder} />
          <View style={{ ...styles.center, height: 75 }}>
            <View style={{ ...styles.container, backgroundColor: '#000' }}>
              <Text
                style={{ fontFamily: 'Roboto', fontSize: 12, color: '#888' }}
              >
                Work time on the order
              </Text>
              <Stopwatch
                reset={!orderStarted}
                start={orderStarted}
                options={options}
              />
            </View>
            {orderStarted ? (
              <View style={{ width: 160 }}>
                {isFinishConfirmation ? (
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Pressable
                      style={{
                        width: 80,
                        backgroundColor: '#029C6E',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onPress={() => setModalVisible(true)}
                    >
                      <Image
                        source={okButton}
                        style={{ width: 36, height: 36, marginBottom: 10 }}
                      />
                    </Pressable>
                    <Pressable
                      style={{
                        width: 80,
                        backgroundColor: '#2D2D2D',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onPress={() => setIsFinishConfirmation(false)}
                    >
                      <Image
                        source={closeButton}
                        style={{ width: 32, height: 32 }}
                      />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    style={{
                      ...styles.container,
                      backgroundColor: '#009C6D'
                    }}
                    onPress={() => setIsFinishConfirmation(true)}
                  >
                    <Text
                      style={{
                        fontFamily: 'Montserrat',
                        fontSize: 30,
                        color: '#fff'
                      }}
                    >
                      FINISH
                    </Text>
                  </Pressable>
                )}
              </View>
            ) : (
              <View style={{ width: 160 }}>
                {isStartConfirmation ? (
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Pressable
                      style={{
                        width: 80,
                        backgroundColor: '#0080FF',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onPress={() => startOrder()}
                    >
                      <Image
                        source={okButton}
                        style={{ width: 36, height: 36, marginBottom: 10 }}
                      />
                    </Pressable>
                    <Pressable
                      style={{
                        width: 80,
                        backgroundColor: '#2D2D2D',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onPress={() => setIsStartConfirmation(false)}
                    >
                      <Image
                        source={closeButton}
                        style={{ width: 32, height: 32 }}
                      />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    style={{
                      ...styles.container,
                      backgroundColor:
                        selectedItems.length > 0 || equipmentArr.length === 0
                          ? '#0080FF'
                          : 'gray'
                    }}
                    onPress={() => {
                      equipmentArr.length === 0 && setIsStartConfirmation(true)
                      selectedItems.length > 0 && setIsStartConfirmation(true)
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Montserrat',
                        fontSize: 30,
                        color: '#fff'
                      }}
                    >
                      START
                    </Text>
                  </Pressable>
                )}
              </View>
            )}
          </View>
        </View>
      ) : null}
      {orderCancelModalVisible && (
        <OrderCancelModal
          item={orders[0]}
          setOrderCancelModalVisible={setOrderCancelModalVisible}
        />
      )}
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {showMaterialsComponent ? (
          <Materials
            materialsArr={materialsArr}
            setMaterialsArr={setMaterialsArr}
            finishOrderParams={finishOrderParams}
            finishOrder={finishOrder}
          />
        ) : (
          <View
            style={{
              ...styles.container,
              backgroundColor: '#fff',
              justifyContent: 'flex-start'
            }}
          >
            <View
              style={{
                width: '100%',
                paddingHorizontal: 17,
                paddingTop: 30,
                paddingBottom: 40,
                borderBottomWidth: 4,
                borderBottomColor: '#00000020',
                marginBottom: 60
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontFamily: 'Montserrat'
                }}
              >
                Operation result
              </Text>
            </View>
            {activeOrder?.operation.relation.map((item, index) => (
              <Pressable
                onPress={() => {
                  setFinishOrderParams({
                    nextOperationId: item.so_id,
                    relationId: item._id
                  })
                  if (
                    activeOrder?.operation.relation[index].function.length > 0
                  ) {
                    maretialsRequest(index)
                    setShowMaterialsComponent(true)
                  } else {
                    finishOrder(
                      finishOrderParams.nextOperationId,
                      finishOrderParams.relationId
                    )
                  }
                }}
                key={item._id}
                style={{
                  ...styles.center,
                  ...styles.operationItem,
                  backgroundColor: item.bgr_color
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Montserrat',
                    fontSize: 18,
                    color: '#fff'
                  }}
                >
                  {item.result}
                </Text>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require('../assets/images/arrow_white.png')}
                />
              </Pressable>
            ))}
            <View style={{ position: 'absolute', bottom: 30 }}>
              <Pressable
                style={{ ...styles.center, ...styles.cancelContainer }}
                onPress={() => {
                  setModalVisible(false)
                }}
              >
                <Image
                  style={{ width: 20, height: 20, marginRight: 15 }}
                  source={require('../assets/images/close.png')}
                />
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 18,
                    color: '#6C6F72'
                  }}
                >
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </Modal>
    </View>
  )
}

export default Main
