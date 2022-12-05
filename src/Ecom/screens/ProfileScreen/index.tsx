import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductList from '../../components/ProductList'

const ProfileScreen = () => {
  return <View style={styles.container}><ProductList /></View>;
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "rgba(255,255,255,0.4)"
    backgroundColor: "white"
  },
});