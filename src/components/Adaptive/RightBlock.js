import React, { useMemo } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import OperationContainer from '../OperationContainer/OperationContainer'
import StartFinishButton from '../StartFinishButton/StartFinishButton'
import Timer from '../Timer/Timer'
import { RightBlockTranslate } from '../../Constants'
import styles from './stylesRightBlock'

const RightBlock = ({ startOrder }) => {
  const previousOperation = useSelector((state) => state.main.previousOperation)
  const isConfirmation = useSelector((state) => state.main.isConfirmation)
  const equipmentArr = useSelector((state) => state.main.equipmentArr)
  const selectedItems = useSelector((state) => state.main.selectedItems)

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new RightBlockTranslate(language))

  return (
    <View style={styles.container}>
      <View>
        <OperationContainer />
        <View style={styles.previousOperation}>
          <Text style={styles.previousOperationTitle}>
            {translate.getPreviousOperationLabel()}
          </Text>
          <Text style={styles.previousOperationText}>
            {previousOperation.length > 0
              ? previousOperation.length[0].name_prev_operation
              : translate.getNoPreviousOperationLabel()}
          </Text>
        </View>
        <View style={styles.resultPreviousOperation}>
          <Text style={{ ...styles.previousOperationTitle, paddingLeft: 10 }}>
            {translate.getResultOfPreviousOperationLabel()}
          </Text>
          <View style={styles.previousOperationTextContainer}>
            <Text style={styles.previousOperationText}>
              {previousOperation.length > 0
                ? previousOperation.length[0].result_prev_operation
                : translate.getNoPreviousOperationLabel()}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Timer />
        <StartFinishButton
          isConfirmation={isConfirmation}
          selectedItems={selectedItems}
          equipmentArr={equipmentArr}
          startOrder={startOrder}
        />
      </View>
    </View>
  )
}

export default RightBlock
