import React from 'react'
import { View, Text, Picker, TextInput } from 'react-native'
import styles from './styles'

const SettingsComponentItem = ({
  title,
  selectedObjects,
  value,
  handler,
  type
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.pickerContainer}>
        {type === 'picker' && (
          <Picker
            mode={'dropdown'}
            selectedValue={value}
            style={styles.pickerStyle}
            onValueChange={(itemValue) => {
              handler(itemValue)
            }}
          >
            {selectedObjects.map((item, index) => {
              return (
                <Picker.Item
                  label={item.label}
                  value={item.value}
                  key={index}
                />
              )
            })}
          </Picker>
        )}
        {type === 'input' && (
          <TextInput
            style={{
              height: 60,
              color: '#000',
              fontSize: 16,
              paddingHorizontal: 10
            }}
            keyboardType='url'
            value={value}
            onChangeText={(hosting) => handler(hosting)}
          />
        )}
      </View>
    </View>
  )
}

export default SettingsComponentItem
