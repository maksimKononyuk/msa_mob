import { StyleSheet } from 'react-native'
import { windowWidth } from '../../Constants'

const styles = StyleSheet.create({
  container: {
    width: windowWidth <= 480 ? '50%' : '100%',
    height: windowWidth <= 480 ? 80 : 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  titleText: {
    fontFamily: 'Roboto',
    fontSize: windowWidth <= 480 ? 11 : 14,
    color: '#888'
  }
})

export default styles
