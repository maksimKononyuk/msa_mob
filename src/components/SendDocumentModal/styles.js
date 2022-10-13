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
    height: '60%',
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
  image: {
    width: '100%',
    height: '100%'
  },
  fileContainer: {
    width: '50%',
    height: '50%',
    alignItems: 'center'
  },
  buttonsBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default styles
