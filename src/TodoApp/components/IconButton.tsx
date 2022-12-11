import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Feather} from '@expo/vector-icons'

const IconButton = ({onPress, icon, size, color, iconStyle}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container]} >
      <Feather
        name={icon}
        size={size}
        color={color}
        style={iconStyle}
      />
    </Pressable>
  );
}

export default IconButton

const styles = StyleSheet.create({
  container: {},
})