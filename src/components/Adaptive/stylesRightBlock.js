import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: '100%',
    width: '25%',
    justifyContent: 'space-between'
  },
  previousOperation: {
    paddingHorizontal: 25,
    marginTop: 30
  },
  previousOperationTitle: {
    color: '#8F8F8F'
  },
  previousOperationText: {
    color: '#FFFFFF',
    fontSize: 16
  },
  previousOperationTextContainer: {
    marginTop: 7,
    width: '100%',
    height: 55,
    backgroundColor: '#CF3B23',
    alignSelf: 'center',
    padding: 10
  },
  resultPreviousOperation: {
    marginTop: 35,
    paddingHorizontal: 15
  }
})

export default styles
