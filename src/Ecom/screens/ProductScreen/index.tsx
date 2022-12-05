import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import products from '../../data/products'
import { useNavigation, useRoute } from '@react-navigation/native'
import ImageCarousel from '../../components/ImageCarousel';
import { Picker } from '@react-native-picker/picker';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';

const ProductScreen = () => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params
  //console.log(id)
  const product = products.find((product) => product.id === id)
  //console.log(product)

  // useEffect(() => {
  //   if (!route.params?.id) {
  //     return;
  //   }
  // }, [route.params?.id])

  useEffect(() => {
    if (product?.options) {
      setSelectedOption(product.options[0])
    }
  }, [product])

  const onAddToCart = () => {
    navigation.navigate("ShoppingCart");
  }
  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>
      <ImageCarousel images={product.images} />
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
      >
        {product.options.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
      <Text style={styles.price}>
        from ${product.price.toFixed(2)}
        {product.oldPrice && (
          <Text style={styles.oldPrice}>${product.oldPrice.toFixed()}</Text>
        )}
      </Text>
      <Text style={styles.description}>{product.description}</Text>
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <Button
        text={"Add To Cart"}
        onPress={onAddToCart}
        containerStyles={{
          backgroundColor: "#e3c905",
          padding: 15
        }}
      />
      <Button
        text={"Buy Now"}
        onPress={() => console.warn("Buy now")}
        containerStyles={{
          padding: 15
        }}
      />
      <View style={{ marginBottom: 30 }} />
    </ScrollView>
  );
}

export default ProductScreen

const styles = StyleSheet.create({
  root: {
    padding: 10,
    backgroundColor: 'white',
    bottom: 60,
    flex: 1
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through'
  },
  title: {},
  description: {
    marginVertical: 10,
    lineHeight: 20
  }
})