import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    paddingHorizontal: 15
  },
  checkAndTitleContainer: {
    flexDirection: 'row'
  },
  checkIcon: {
    width: 30,
    height: 30,
    //backgroundColor: '#0080FF',
    alignItems: 'center',
    borderRadius: 4
  },
  okButton: {
    width: '80%',
    height: '80%'
  },
  title: {
    marginLeft: 15,
    fontSize: 16,
    fontFamily: 'Roboto'
  },
  busy: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 24,
    backgroundColor: '#EC0000',
    borderRadius: 2
  },
  busyText: {
    fontFamily: 'Roboto',
    fontSize: 13,
    color: '#fff'
  }
})

export default styles
