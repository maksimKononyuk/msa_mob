import React from 'react'
import { View, Text, Picker } from 'react-native'
import styles from './styles'

const SettingsComponentItem = ({
  title,
  selectedObjects,
  selectedValue,
  handler
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          mode={'dropdown'}
          selectedValue={selectedValue}
          style={styles.pickerStyle}
          onValueChange={(itemValue) => {
            handler(itemValue)
          }}
        >
          {selectedObjects.map((item, index) => {
            return (
              <Picker.Item label={item.label} value={item.value} key={index} />
            )
          })}
        </Picker>
      </View>
    </View>
  )
}

export default SettingsComponentItem
