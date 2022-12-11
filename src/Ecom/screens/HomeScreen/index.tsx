import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import products from '../../data/products'
import Button from '../../components/Button'
import { DataStore } from "@aws-amplify/datastore";
import { Product } from '../../../models';
import CartProductItem from '../../components/CartProductItem'
import ProductItem from '../../components/ProductItem'
import ImageCarousel from '../../components/ImageCarousel'
import Colors from '../../utils/Colors'
import Animated, { BounceIn, FadeIn, FadeInDown, StretchInY, ZoomIn } from 'react-native-reanimated'
import Toast from "react-native-root-toast";

import loadProducts from '../../scripts/loadProducts'

async function createProducts() {
  try {
    await loadProducts();
    Toast.show('Products loaded, pull to refresh', {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      })
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
    <View style={{flex: 1, top: 150}}>
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

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   fetchProducts();
  // }, [])

  // //console.log(products);

  // async function fetchProducts() {
  //   const data = await DataStore.query(Product);
  //   setProducts(data)
  // }

  //console.log(products)
  return (
    <Animated.View
      style={{
        paddingHorizontal: 10,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }}
      entering={FadeIn}
    >
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem item={item} />}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      />
    </Animated.View>
  );
}


export default HomeScreen

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 50,
    marginVertical: 6,
    backgroundColor: Colors.bgRoseTint2
  }
})