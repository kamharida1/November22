import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import cartItems from '../../data/cart';
import products from '../../data/products'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import CartProductItem from '../../components/CartProductItem';
import Button from '../../components/Button';

const ShoppingCartScreen = () => {
  const [cartProducts, setCartProducts] = useState(cartItems);
  const navigation = useNavigation();

  const totalPrice = 368.44

  const onCheckout = () => {
    navigation.navigate("Address", { totalPrice });
  }

  return (
    <View style={{flex: 1, padding: 10, marginBottom: 50}}>
      <FlatList
        data={cartProducts}
        renderItem={({ item }) => <CartProductItem cartItem={item} />}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator= {false}
        ListHeaderComponent={() => (
          <View style={{ marginTop : 20}}>
            <Text style={{ fontSize: 18 }}>
              Subtotal ({cartProducts.length} items):{' '}
              <Text style={{color: '#e47911', fontWeight: 'bold'}}>
                ${totalPrice.toFixed(2)}
              </Text>
            </Text>
            <Button
              text="Proceed to checkout"
              onPress={onCheckout}
              containerStyles={{
                backgroundColor: '#f7e300',
                borderColor: '#c7b702',
                padding: 13
              }}
            />
          </View>
        )}
      />
    </View>
  )
}

export default ShoppingCartScreen

const styles = StyleSheet.create({})