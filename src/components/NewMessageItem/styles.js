import { StyleSheet } from 'react-native'
import { windowWidth } from '../../Constants'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#F1F1F1',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    width: '75%'
  },
  sendButton: {
    width: 46,
    height: 46
  },
  sendButtonImage: {
    width: '100%',
    height: '100%'
  }
})

export default styles
