import {
  SET_ACTIVE_BARCODE,
  SET_ACTIVE_INDEX,
  SET_ACTIVE_ORDER,
  SET_MODAL_VISIBLE,
  SET_ORDERS,
  SET_ORDER_STARTED,
  SET_PLAY_SOUND,
  SET_USER
} from '../actionTypes'

const initialState = {
  user: null,
  orders: [],
  isPlaySound: false,
  activeOrder: null,
  activeIndex: 1,
  activeBarCode: false,
  orderStarted: false,
  modalVisible: false
}

export default mainReduser = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.data }
    case SET_ORDERS:
      return { ...state, orders: action.data }
    case SET_PLAY_SOUND:
      return { ...state, isPlaySound: action.data }
    case SET_ACTIVE_ORDER:
      return { ...state, activeOrder: action.data }
    case SET_ACTIVE_INDEX:
      return { ...state, activeIndex: action.data }
    case SET_ACTIVE_BARCODE:
      return { ...state, activeBarCode: action.data }
    case SET_ORDER_STARTED:
      return { ...state, orderStarted: action.data }
    case SET_MODAL_VISIBLE:
      return { ...state, modalVisible: action.data }
    default:
      return state
  }
}
