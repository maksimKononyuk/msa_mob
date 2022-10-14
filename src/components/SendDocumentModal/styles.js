import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#000000aa'
  },
  visibleContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 5
  },
  imageBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%'
  },
  buttonsBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default styles
