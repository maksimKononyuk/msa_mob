import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 17,
    paddingTop: 30,
    paddingBottom: 19,
    borderBottomWidth: 3,
    borderBottomColor: '#00000029',
    backgroundColor: '#fff',
    elevation: 6
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  okButton: {
    marginTop: 50,
    alignSelf: 'center',
    width: 200,
    height: 66,
    backgroundColor: '#009C6D',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  okButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto'
  },
  cancelButton: {
    width: 140,
    height: 45,
    borderWidth: 2,
    borderColor: '#707070',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  cancelButtonText: {
    color: '#6C6F72',
    fontSize: 16,
    fontFamily: 'Roboto'
  },
  cross: {
    marginRight: 10
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: '#6C6F72'
  },
  upLine: {
    transform: [{ rotate: '45deg' }, { translateY: 1.5 }]
  },
  downLine: {
    transform: [{ rotate: '-45deg' }, { translateY: -1.5 }]
  }
})

export default styles
