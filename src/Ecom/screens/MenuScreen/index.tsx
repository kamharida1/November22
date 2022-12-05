import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../../components/Button';
import Colors from '../../utils/Colors';
import Toast from "react-native-root-toast";

import { DataStore } from "@aws-amplify/datastore";
import loadProducts from "../../scripts/loadProducts";

async function createProducts() {
  try {
    await loadProducts();
    Toast.show("Products loaded, pull to refresh", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  } catch (error) {
    Toast.show(`${error}`, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }
}

async function clearDataStore() {
  await DataStore.clear();
  Toast.show("Storage cleared, pull to refresh", {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
}



function Header() {
  return (
    <View style={{ flex: 1, top: 150 }}>
      <Button
        containerStyles={styles.buttonContainer}
        text="Create dummy products"
        onPress={createProducts}
      />
      <Button
        containerStyles={styles.buttonContainer}
        text="Clear local Storage"
        onPress={clearDataStore}
      />
    </View>
  );
}


const MenuScreen = () => {
  return (
    <View>
      <Header />
    </View>
  )
}

export default MenuScreen

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: 50,
    marginVertical: 6,
    backgroundColor: Colors.bgRoseTint2,
  },
});