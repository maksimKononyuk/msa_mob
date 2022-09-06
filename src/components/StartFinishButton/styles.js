import { StyleSheet } from 'react-native'
import { windowWidth } from '../../Constants'

const styles = StyleSheet.create({
  container: {
    width: windowWidth <= 480 ? '50%' : '100%',
    height: windowWidth <= 480 ? 80 : 128
  },
  okCloseButtonsContainer: {
    flexDirection: 'row',
    flex: 1
  },
  buttonContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  okIcon: {
    width: 36,
    height: 36,
    marginBottom: 10
  },
  closeIcon: {
    width: 32,
    height: 32
  },
  titleText: {
    fontFamily: 'Montserrat',
    color: '#fff'
  }
})

export default styles
