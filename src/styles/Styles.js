import { StyleSheet } from 'react-native'

import { windowWidth } from '../Constants'

const styles = StyleSheet.create({
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  authInput: {
    width: '100%',
    backgroundColor: 'transparent',
    fontFamily: 'Roboto',
    fontSize: 18,
    marginTop: 10
  },
  authButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 10,
    marginTop: 30
  },
  authText: {
    fontFamily: 'Montserrat',
    fontSize: 24,
    color: '#fff'
  },
  authError: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#E31E24',
    padding: 20,
    width: '100%'
  },
  authContainer: {
    width: '100%',
    padding: 60,
    display: 'flex',
    alignItems: 'center',
    paddingTop: -50
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    width: '100%',
    height: 42,
    padding: 10
  },
  headerName: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: '#fff',
    marginLeft: 10
  },
  headerComplete: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: '#707070',
    marginRight: 10
  },
  orderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    width: windowWidth,
    padding: 10
  },
  printButton: {
    width: 76,
    height: 36,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
    padding: 20
  },
  operationContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    padding: 12,
    backgroundColor: '#F5F5F5',
    width: '100%'
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    backgroundColor: '#fff'
  }
})

export default styles