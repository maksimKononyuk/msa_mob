import { StyleSheet } from 'react-native'
import { windowWidth } from '../../Constants'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 14,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 15
  },
  infoBlock: {},
  upPart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logoAndUserName: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 20,
    height: 20
  },
  text: {
    fontSize: windowWidth <= 480 ? 8 : 14,
    marginHorizontal: 5,
    color: '#8F8F8F'
  },
  operationBlock: {
    marginLeft: 20
  },
  message: {
    marginLeft: 25,
    color: '#282A2D',
    fontSize: windowWidth <= 480 ? 14 : 18
  },
  operationText: {
    width: '100%'
  },
  fileIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap'
  }
})

export default styles
