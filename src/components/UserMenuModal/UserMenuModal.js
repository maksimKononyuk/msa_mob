import React, { useEffect, useState, useMemo } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  BackHandler,
  TextInput,
  ScrollView
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../../styles/Styles'
import componentStyles from './styles'
import axios from 'axios'
import CancelButton from '../CancelButton/CancelButton'
import CompleteWorkShift from '../CompleteWorkShift/CompleteWorkShift'
import SettingsComponent from '../SettingsComponent/SettingsComponent'
import * as Application from 'expo-application'
import {
  setIsUserMenuModal,
  setIsCompleteWorkShiftVisible,
  setUserMenuOrders,
  setTempDetail,
  setCreatedOrderId,
  setIsErrorComponentVisible,
  setErrorMessage
} from '../../redux/actionCreators'
import UserMenuItem from '../UserMenuItem/UserMenuItem'
import OKButton from '../OKButton/OKButton'
import { useDispatch, useSelector } from 'react-redux'
import { UserMenuModalTranslate } from '../../Constants'
import ErrorComponent from '../ErrorComponent/ErrorComponent'

const UsersMenuModal = ({ logOut }) => {
  const [isModalNewOrder, setIsModalNewOrder] = useState(false)
  const [isModalGetDetails, setIsModalGetDetails] = useState(false)

  const dispatch = useDispatch()
  const isCompleteWorkShiftVisible = useSelector(
    (state) => state.usersMenuModal.isCompleteWorkShiftVisible
  )
  const orders = useSelector((state) => state.usersMenuModal.orders)
  const tempDetail = useSelector((state) => state.usersMenuModal.tempDetail)
  const createdOrderId = useSelector(
    (state) => state.usersMenuModal.createdOrderId
  )

  const isErrorComponentVisible = useSelector(
    (state) => state.error.isCompleteWorkShiftVisible
  )
  const [isSettingsVisible, setIsSettingsVisible] = useState(false)

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(
    () => new UserMenuModalTranslate(language),
    [language]
  )

  const textInputHandler = (text, key) => {
    dispatch(setTempDetail(text, key))
  }

  const sendingOrderForExecution = () => {
    axios
      .post('worker_order_execution', {
        _id: createdOrderId,
        s_id: tempDetail.stream,
        worker: {
          o_id: tempDetail.worker.o_id,
          w_id: tempDetail.order.composition['Worker id'],
          name: tempDetail.order.composition['Worker']
        }
      })
      .then((res) => dispatch(setIsUserMenuModal(false)))
      .catch((err) => {
        console.log('Network error when sending an order for execution ' + err)
        dispatch(setErrorMessage('when sending an order for execution ' + err))
        dispatch(setIsErrorComponentVisible(true))
      })
  }

  useEffect(() => {
    if (createdOrderId && tempDetail.stream) sendingOrderForExecution()
    return () => dispatch(setCreatedOrderId(null))
  }, [createdOrderId])

  const menuItemHandler = async (item) => {
    const user = JSON.parse(await AsyncStorage.getItem('user'))
    item.order.composition['Worker'] = user.name
    item.order.composition['Worker id'] = user.u_id
    dispatch(setTempDetail(item))
    setIsModalGetDetails(true)
  }

  const getNewOrder = async () => {
    axios
      .get('deskbook_info/61f5b6541f1d04747fffe837')
      .then((res) => {
        dispatch(setUserMenuOrders(Object.values(res.data[0].value)))
        setIsModalNewOrder(true)
      })
      .catch((err) => {
        console.log(
          'Network error when receiving orders in the user menu ' + err
        )
        dispatch(
          setErrorMessage('when receiving orders in the user menu ' + err)
        )
        dispatch(setIsErrorComponentVisible(true))
      })
  }

  const sendFormData = () => {
    axios
      .post('worker_new_order_pending', {
        type: 'template',
        name: tempDetail.order.name,
        composition: {
          'What to deliver?': tempDetail.order.composition['What to deliver?'],
          'Detail id': tempDetail.order.composition['Detail id'],
          Workplace: tempDetail.order.composition['Workplace'],
          Worker: tempDetail.order.composition['Worker'],
          'Worker id': tempDetail.order.composition['Worker id']
        }
      })
      .then((res) => dispatch(setCreatedOrderId(res.data)))
      .catch((err) => {
        console.log('Network error when sending form data ' + err)
        dispatch(setErrorMessage('when sending form data ' + err))
        dispatch(setIsErrorComponentVisible(true))
      })
      .finally(() => {
        setIsModalGetDetails(false)
        setIsModalNewOrder(false)
      })
  }

  return (
    <Modal animationType='slide' transparent={true} visible={true}>
      <View style={componentStyles.container}>
        <View style={componentStyles.menuItemBlock}>
          <UserMenuItem
            title={translate.getNewOrderLabel()}
            handler={getNewOrder}
          />
          <UserMenuItem
            title={translate.getSettingsLabel()}
            handler={() => setIsSettingsVisible((prev) => !prev)}
          />
          <UserMenuItem
            title={translate.getLogoutLabel()}
            handler={() => dispatch(setIsCompleteWorkShiftVisible(true))}
          />
          <UserMenuItem
            title={translate.getExitLabel()}
            handler={() => BackHandler.exitApp()}
          />
        </View>
        <View style={componentStyles.closeButtomContainer}>
          <CancelButton handler={() => dispatch(setIsUserMenuModal(false))} />
        </View>
        <Text style={styles.versionText}>
          {translate.getVersionLabel()}: {Application.nativeApplicationVersion}
        </Text>
        <Modal
          animationType='slider'
          transparent={true}
          visible={isModalNewOrder}
        >
          <View style={componentStyles.container}>
            <View style={componentStyles.orderContainer}>
              <Text
                style={[
                  componentStyles.menuItemText,
                  componentStyles.newOrderText
                ]}
              >
                {translate.getNewOrderLabel()}
              </Text>
              <View style={componentStyles.menuItemBlock}>
                {orders.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={componentStyles.menuItem}
                      key={index}
                      onPress={() => menuItemHandler(item)}
                    >
                      <Text style={componentStyles.menuItemText}>
                        {item?.order?.name || ''}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
            <CancelButton handler={() => setIsModalNewOrder(false)} />
          </View>
          <Modal
            animationType='slider'
            transparent={false}
            visible={isModalGetDetails}
          >
            <View style={componentStyles.container}>
              <View style={componentStyles.orderContainer}>
                <Text style={componentStyles.orderNameText}>
                  {tempDetail?.order?.name}
                </Text>
                <ScrollView style={componentStyles.scroll}>
                  {tempDetail.order &&
                    Object.entries(tempDetail.order.composition)
                      .sort()
                      .map(([key, value]) => (
                        <View
                          style={componentStyles.whatToDeliverContainer}
                          key={key}
                        >
                          <Text style={componentStyles.whatToDeliverText}>
                            {key}
                          </Text>
                          <TextInput
                            style={componentStyles.input}
                            value={value}
                            onChangeText={(text) => {
                              textInputHandler(text, key)
                            }}
                          />
                        </View>
                      ))}
                </ScrollView>
                <OKButton handler={sendFormData} />
                <CancelButton handler={() => setIsModalGetDetails(false)} />
              </View>
            </View>
          </Modal>
        </Modal>
        {isCompleteWorkShiftVisible && <CompleteWorkShift logOut={logOut} />}
        {isSettingsVisible && (
          <SettingsComponent setIsSettingsVisible={setIsSettingsVisible} />
        )}
        {isErrorComponentVisible && <ErrorComponent />}
      </View>
      {isErrorComponentVisible && <ErrorComponent />}
    </Modal>
  )
}

export default UsersMenuModal
