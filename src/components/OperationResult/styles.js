import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  resultContainer: {
    width: '100%',
    paddingHorizontal: 17,
    paddingTop: 30,
    paddingBottom: 40,
    borderBottomWidth: 3,
    borderBottomColor: '#00000029',
    elevation: 6,
    backgroundColor: 'white',
    marginBottom: 60
  },
  resultText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat'
  },
  itemResultText: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    color: '#fff',
    width: '90%'
  },
  arrowIcon: {
    width: 20,
    height: 20
  },
  canselButtonContainer: {
    position: 'absolute',
    bottom: 30
  },
  closeIcon: {
    width: 20,
    height: 20,
    marginRight: 15
  },
  canselButtonTitle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#6C6F72'
  }
})

export default styles
