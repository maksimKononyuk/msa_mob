import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  scroll: {
    flex: 1,
    padding: 10,
    marginBottom: 0
  },
  noMessageText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    padding: 15
  },
  newMessageItemContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 5
  }
})

export default styles
