import React, { useMemo } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { Stopwatch } from '../../lib/react-native-stopwatch-timer'
import componentStyles from './styles'
import { options, TimerTranslate } from '../../Constants'

const Timer = () => {
  const orderStarted = useSelector((state) => state.main.orderStarted)
  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new TimerTranslate(language))
  return (
    <View style={componentStyles.container}>
      <Text style={componentStyles.titleText}>{translate.getTitleLable()}</Text>
      <Stopwatch reset={!orderStarted} start={orderStarted} options={options} />
    </View>
  )
}

export default Timer
