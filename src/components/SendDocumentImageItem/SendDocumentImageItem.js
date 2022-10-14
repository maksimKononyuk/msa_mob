import React from 'react'
import { View, Image, Text } from 'react-native'
import styles from './styles'

const SendDocumentImageItem = ({ fileName, fileUri, isOneItem }) => {
  return (
    <View
      style={[
        styles.container,
        { width: isOneItem ? '100%' : 240, height: isOneItem ? '100%' : 135 }
      ]}
    >
      {fileName.toLowerCase().includes('jpg') ||
      fileName.toLowerCase().includes('jpeg') ||
      fileName.toLowerCase().includes('png') ? (
        <Image
          style={styles.image}
          resizeMode='contain'
          source={{ uri: fileUri }}
        />
      ) : (
        <View style={styles.fileContainer}>
          <Image
            style={styles.image}
            resizeMode='contain'
            source={require('../../assets/icons/file.png')}
          />
          <Text>{fileName.split('.').reverse()[0]}</Text>
        </View>
      )}
    </View>
  )
}

export default SendDocumentImageItem
