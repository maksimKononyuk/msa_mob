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
    height: '90%',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 5
  },
  imageBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%'
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#0080FF',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  crossLine: {
    width: 30,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'absolute'
  },
  canselContainer: {
    alignItems: 'center'
  }
})

export default styles
