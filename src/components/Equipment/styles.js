import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 55,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5'
  },
  headetText: {
    fontSize: 18,
    fontFamily: 'Montserrat'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginRight: -5
  },
  buttonIcon: {
    width: '100%',
    height: '100%'
  }
})

export default styles
