import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from '../../styles/Styles'
import componentStyles from './styles'
import { setIsUserMenuModal } from '../../redux/actionCreators'
import UsersMenuModal from '../UserMenuModal/UserMenuModal'
import MenuButton from '../MenuButton/MenuButton'
import { useDispatch, useSelector } from 'react-redux'

const Header = ({ logOut, userName }) => {
  const dispatch = useDispatch()
  const isUserMenuModal = useSelector((state) => state.header.isUserMenuModal)

  return (
    <View style={styles.headerContainer}>
      <View style={styles.center}>
        <Image
          style={componentStyles.personIcon}
          source={require('../../assets/images/person.png')}
        />
        <Text style={styles.headerName}>{userName}</Text>
      </View>
      <MenuButton
        buttonColor={'#fff'}
        handler={() => dispatch(setIsUserMenuModal(true))}
      />
      {isUserMenuModal && <UsersMenuModal logOut={logOut} />}
    </View>
  )
}

export default Header
