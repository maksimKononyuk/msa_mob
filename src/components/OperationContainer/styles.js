import { StyleSheet } from 'react-native'
import { windowWidth } from '../../Constants'

const styles = StyleSheet.create({
  operationText: {
    fontFamily: 'Roboto',
    fontSize: windowWidth <= 480 ? 12 : 14,
    color: '#8F8F8F'
  },
  descriptionNameText: {
    fontFamily: 'Montserrat',
    fontSize: windowWidth <= 480 ? 18 : 26,
    color: windowWidth > 480 ? '#fff' : '#000'
  },
  scrollContainer: {
    maxHeight: windowWidth > 480 ? 150 : 60
  }
})

export default styles
