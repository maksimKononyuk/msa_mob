import { StyleSheet } from 'react-native'
import { windowWidth } from '../../Constants'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    paddingTop: windowWidth > 480 ? 95 : 120
  },
  modalTitle: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: windowWidth > 480 ? 30 : 22
  },
  buttonBlock: {
    marginTop: 80,
    flexDirection: windowWidth > 480 ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 295,
    height: 70,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: windowWidth > 480 ? 20 : 0,
    marginBottom: windowWidth > 480 ? 0 : 35,
    backgroundColor: '#009C6D'
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: 20,
    marginLeft: 15
  }
})

export default styles
