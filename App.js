import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider as PaperProvider } from 'react-native-paper'

import Auth from './src/pages/Auth'
import Main from './src/pages/Main'

import { theme, windowWidth } from './src/Constants'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import * as ScreenOrientation from 'expo-screen-orientation'

const Stack = createNativeStackNavigator()

export default function App() {
  useEffect(() => {
    windowWidth > 480 && ScreenOrientation.unlockAsync()
  }, [windowWidth])
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            headerMode={'screen'}
            screenOptions={() => ({
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: false,
              animationEnabled: true
            })}
            mode='modal'
            initialRouteName='Auth'
          >
            <Stack.Screen name='Auth' component={Auth} />
            <Stack.Screen name='Main' component={Main} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}
