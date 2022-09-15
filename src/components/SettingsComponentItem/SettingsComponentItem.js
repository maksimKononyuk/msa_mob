import React from 'react'
import { View, Text, Picker } from 'react-native'

const SettingsComponentItem = ({
  title,
  selectedObjects,
  selectedValue,
  handler
}) => {
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ color: '#fff', marginBottom: 5 }}>{title}</Text>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 5,
          paddingHorizontal: 10
        }}
      >
        <Picker
          mode={'dropdown'}
          selectedValue={selectedValue}
          style={{
            height: 60,
            color: '#000'
          }}
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
