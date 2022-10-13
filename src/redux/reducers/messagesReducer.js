import { SET_MESSAGES, SET_IS_KEYBOARD_VISIBLE } from '../actionTypes'

const initialState = {
  messages: [],
  isKeyboardVisible: false
}

export default messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return { ...state, messages: action.data }
    case SET_IS_KEYBOARD_VISIBLE:
      return { ...state, isKeyboardVisible: !state.isKeyboardVisible }
    default:
      return state
  }
}
