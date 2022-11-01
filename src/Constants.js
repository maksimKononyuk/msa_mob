import AsyncStorage from '@react-native-async-storage/async-storage'
import { DefaultTheme } from 'react-native-paper'
import { Dimensions } from 'react-native'
import axios from 'axios'

const url = 'https://demomsa.com/api/' // dev
//const url = 'https://customer.demomsa.com/api' // prod

axios.defaults.baseURL = url

axios.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      if (await AsyncStorage.getItem('user')) {
        const token = JSON.parse(await AsyncStorage.getItem('user')).token

        if (token) {
          config.headers.Authorization = `Token ${token}`
        }
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

export const storageClear = async () => {
  await AsyncStorage.removeItem('user')
  await AsyncStorage.removeItem('role')
}

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: 'yellow'
  }
}

export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height

export const getCarouselItems = (lang) => {
  switch (lang) {
    case 'en':
      return [
        { title: 'Messages' },
        { title: 'Order' },
        { title: 'Tech. maps' }
      ]
    case 'ru':
      return [
        { title: 'Сообщения' },
        { title: 'Заказ' },
        { title: 'Тех. карты' }
      ]
    default:
      return [
        { title: 'Messages' },
        { title: 'Order' },
        { title: 'Tech. maps' }
      ]
  }
}

export const jsonTreeTheme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#FFFFFF',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#282A2D',
  base0C: '#a1efe4',
  base0D: '#009C6D',
  base0E: '#ae81ff',
  base0F: '#cc6633'
}

export const options = {
  container: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: windowWidth <= 480 ? 30 : (windowWidth / 4) * 0.22,
    color: '#fff'
  }
}

export const htmlPrint = (id, name, ImgTag) => {
  return `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body>
      <div style="font-size: 50px; font-family: Helvetica Neue; text-align: center;">
        <p style="margin: 0 0 20px; font-weight: bold";>Order's id</p>
        <p style="margin: 0px">${id}</p>
        <p style="margin: 40px 0 20px; font-weight: bold"">Order's name</p>
        <p style="margin: 0px">${name}</p>
        <div style="width: 500px; height: 500px; margin: 0 auto;">
         ${ImgTag}
        </div>
      </div>
    </body>
  </html>
  `
}
export class SettingsComponentTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getLanguageLabel() {
    switch (this.lang) {
      case 'en':
        return 'Language'
      case 'ru':
        return 'Язык'
      default:
        return 'Language'
    }
  }
  getEnglishLabel() {
    switch (this.lang) {
      case 'en':
        return 'English'
      case 'ru':
        return 'Английский'
      default:
        return 'English'
    }
  }
  getRussianLabel() {
    switch (this.lang) {
      case 'en':
        return 'Russian'
      case 'ru':
        return 'Русский'
      default:
        return 'Russian'
    }
  }
  getHostingLabel() {
    switch (this.lang) {
      case 'en':
        return 'Hosting'
      case 'ru':
        return 'Хостинг'
      default:
        return 'Hosting'
    }
  }
  getSettingsLabel() {
    switch (this.lang) {
      case 'en':
        return 'Settings'
      case 'ru':
        return 'Настройки'
      default:
        return 'Settings'
    }
  }
}

export class CancelButtonTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getCancelLabel() {
    switch (this.lang) {
      case 'en':
        return 'Cancel'
      case 'ru':
        return 'Отмена'
      default:
        return 'Cancel'
    }
  }
}

export class UserMenuModalTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getNewOrderLabel() {
    switch (this.lang) {
      case 'en':
        return 'New order'
      case 'ru':
        return 'Новый заказ'
      default:
        return 'New order'
    }
  }
  getLogoutLabel() {
    switch (this.lang) {
      case 'en':
        return 'Logout'
      case 'ru':
        return 'Выйти'
      default:
        return 'Logout'
    }
  }
  getSettingsLabel() {
    switch (this.lang) {
      case 'en':
        return 'Settings'
      case 'ru':
        return 'Настройки'
      default:
        return 'Settings'
    }
  }
  getExitLabel() {
    switch (this.lang) {
      case 'en':
        return 'Exit'
      case 'ru':
        return 'Закрыть'
      default:
        return 'Exit'
    }
  }
  getVersionLabel() {
    switch (this.lang) {
      case 'en':
        return 'Version'
      case 'ru':
        return 'Версия'
      default:
        return 'Version'
    }
  }
}

export class ActiveOrderTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getInfoLable() {
    switch (this.lang) {
      case 'en':
        return 'Complete order information will appear after clicking "START"'
      case 'ru':
        return 'Полная информация о заказе появится после нажатия кнопки "НАЧАТЬ"'
      default:
        return 'Complete order information will appear after clicking "START"'
    }
  }
}
export class OperationContainerTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getTitleLabel() {
    switch (this.lang) {
      case 'en':
        return 'Operation'
      case 'ru':
        return 'Операция'
      default:
        return 'Operation'
    }
  }
}

export class TimerTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getTitleLable() {
    switch (this.lang) {
      case 'en':
        return 'Work time on the order'
      case 'ru':
        return 'Время работы над заказом'
      default:
        return 'Work time on the order'
    }
  }
}

export class StartFinishButtonTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getStartLable() {
    switch (this.lang) {
      case 'en':
        return 'START'
      case 'ru':
        return 'НАЧАТЬ'
      default:
        return 'START'
    }
  }
  getFinishLable() {
    switch (this.lang) {
      case 'en':
        return 'FINISH'
      case 'ru':
        return 'ЗАВЕРШИТЬ'
      default:
        return 'FINISH'
    }
  }
  getStartAlert() {
    switch (this.lang) {
      case 'en':
        return 'Choose equipment!'
      case 'ru':
        return 'Выберите оборудование!'
      default:
        return 'Choose equipment!'
    }
  }
}
export class OrdersTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getTitleLable() {
    switch (this.lang) {
      case 'en':
        return 'Searching for available orders'
      case 'ru':
        return 'Поиск доступных заказов'
      default:
        return 'Searching for available orders'
    }
  }
}

export class CompleteWorkShiftTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getInfoLable() {
    switch (this.lang) {
      case 'en':
        return 'Do you really want to complete your work shift?'
      case 'ru':
        return 'Вы действительно хотите завершить свою рабочую смену?'
      default:
        return 'Do you really want to complete your work shift?'
    }
  }
  getYesLable() {
    switch (this.lang) {
      case 'en':
        return 'Yes'
      case 'ru':
        return 'Да'
      default:
        return 'Yes'
    }
  }
  getNoLable() {
    switch (this.lang) {
      case 'en':
        return 'No'
      case 'ru':
        return 'Нет'
      default:
        return 'No'
    }
  }
}

export class OperationResultTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getTitleLable() {
    switch (this.lang) {
      case 'en':
        return 'Operation result'
      case 'ru':
        return 'Результат операции'
      default:
        return 'Operation result'
    }
  }
}
export class EquipmentTranslale {
  constructor(lang) {
    this.lang = lang
  }
  getTitleLabel() {
    switch (this.lang) {
      case 'en':
        return 'Choose equipment'
      case 'ru':
        return 'Выберите оборудование'
      default:
        return 'Choose equipment'
    }
  }
}

export class MessagesTranslale {
  constructor(lang) {
    this.lang = lang
  }
  getInfoLabel() {
    switch (this.lang) {
      case 'en':
        return 'You have not messages'
      case 'ru':
        return 'У вас нет сообщений'
      default:
        return 'You have not messages'
    }
  }
  getNewMessageLabel() {
    switch (this.lang) {
      case 'en':
        return 'New message'
      case 'ru':
        return 'Новое сообщение'
      default:
        return 'New message'
    }
  }
}
export class MainTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getFinishOrderAlert() {
    switch (this.lang) {
      case 'en':
        return 'Your operation has been completed!'
      case 'ru':
        return 'Ваша операция завершена!'
      default:
        return 'Your operation has been completed!'
    }
  }
}
export class AuthTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getSignInLabel() {
    switch (this.lang) {
      case 'en':
        return 'Sign in'
      case 'ru':
        return 'Вход'
      default:
        return 'Sign in'
    }
  }
  getLoginLabel() {
    switch (this.lang) {
      case 'en':
        return 'Login'
      case 'ru':
        return 'Логин'
      default:
        return 'Login'
    }
  }
  getPasswordLabel() {
    switch (this.lang) {
      case 'en':
        return 'Password'
      case 'ru':
        return 'Пароль'
      default:
        return 'Password'
    }
  }
}

export class RightBlockTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getPreviousOperationLabel() {
    switch (this.lang) {
      case 'en':
        return 'Previous operation'
      case 'ru':
        return 'Предыдущая операция'
      default:
        return 'Previous operation'
    }
  }
  getResultOfPreviousOperationLabel() {
    switch (this.lang) {
      case 'en':
        return 'Result of Previous operation'
      case 'ru':
        return 'Результат предыдущей операции'
      default:
        return 'Result of Previous operation'
    }
  }
  getNoPreviousOperationLabel() {
    switch (this.lang) {
      case 'en':
        return 'No previous operation'
      case 'ru':
        return 'Нет предыдущей операции'
      default:
        return 'No previous operation'
    }
  }
}
export class MaterialsTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getTitleLabel() {
    switch (this.lang) {
      case 'en':
        return 'Materials, semi-finished products, finished products'
      case 'ru':
        return 'Материалы, полуфабрикаты, готовая продукция'
      default:
        return 'Materials, semi-finished products, finished products'
    }
  }
}
