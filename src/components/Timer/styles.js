import { StyleSheet } from 'react-native'
import { windowWidth } from '../../Constants'

const styles = StyleSheet.create({
  container: {
    width: windowWidth <= 480 ? '50%' : '100%',
    height: windowWidth <= 480 ? 80 : 100,
    justifyContent: 'center',
    alignItems: windowWidth <= 480 ? 'center' : 'flex-start',
    backgroundColor: '#000',
    paddingLeft: windowWidth <= 480 ? 0 : 25
  },
  titleText: {
    fontFamily: 'Roboto',
    fontSize: windowWidth <= 480 ? 12 : 14,
    color: '#888'
  }
})

export default styles
