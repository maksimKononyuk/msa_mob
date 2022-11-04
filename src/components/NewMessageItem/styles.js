import { StyleSheet } from 'react-native'
import { windowWidth } from '../../Constants'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#F9F9F9',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56
  },
  input: {
    width: '75%',
    marginLeft: 10
  },
  sendButton: {
    width: 46,
    height: 46
  },
  sendButtonImage: {
    width: '100%',
    height: '100%'
  },
  filePickerAndInputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default styles
