import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    flex: 1,
    paddingTop: 20,
    paddingBottom: 45
  },
  scrollViewStyle: {
    backgroundColor: '#000'
  },
  menuItemBlock: {
    width: '100%',
    alignItems: 'center'
  },
  menuItem: {
    width: '85%',
    height: 70,
    backgroundColor: '#242424',
    marginBottom: 15,
    justifyContent: 'center',
    paddingLeft: 20
  },
  menuItemText: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: 18
  },
  input: {
    width: '85%',
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Roboto'
  },
  closeButtomContainer: {
    marginTop: 20
  },
  newOrderText: {
    fontSize: 24,
    marginBottom: 45
  },
  orderContainer: {
    width: '100%',
    alignItems: 'center'
  },
  orderNameText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center'
  },
  scroll: {
    height: '70%',
    width: '100%'
  },
  whatToDeliverContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 5
  },
  whatToDeliverText: {
    color: '#fff',
    fontSize: 14,
    width: '85%'
  },
  detailIdContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 5
  },
  detailIdText: {
    color: '#fff',
    fontSize: 14,
    width: '85%'
  },
  workplaceContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 5
  },
  workplaceText: {
    color: '#fff',
    fontSize: 14,
    width: '85%'
  }
})

export default styles
