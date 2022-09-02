import { StyleSheet } from 'react-native'
import { windowWidth } from '../../Constants'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 14,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 15
  },
  infoBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftPart: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 20,
    height: 20
  },
  text: {
    fontSize: windowWidth <= 480 ? 8 : 14,
    marginHorizontal: 5,
    color: '#8F8F8F'
  },
  message: {
    marginLeft: 25,
    color: '#282A2D',
    fontSize: windowWidth <= 480 ? 14 : 18
  },
  operationText: {
    width: 100
  }
})

export default styles
