import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Cart from '../../data/cart'
import {FontAwesome} from '@expo/vector-icons'
import QuantitySelector from '../QuantitySelector';

interface CartProductItemProps {
  cartItem: typeof Cart[0];
}

const CartProductItem = ({ cartItem }: CartProductItemProps) => {
  // console.log(cartItem)
  const { item } = cartItem;
  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>
          {/* Ratings */}
          <View style={styles.ratingsContainer}>
            {[0, 0, 0, 0].map((el, i) => (
              <FontAwesome
                key={`${item.id}-${i}`}
                style={styles.star}
                name={i < Math.floor(item.avgRating) ? 'star' : 'star-o'}
                size={18}
                color={'#e47911'}
              />
            ))}
            <Text>{item.ratings}</Text>
          </View>
          <Text style={styles.price}>
            from ${item.price}
            {item.oldPrice && (
              <Text style={styles.oldPrice}>${item.oldPrice}</Text>
            )}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <QuantitySelector quantity={3} setQuantity={()=>{}} />
      </View>
    </View>
  );
};

export default CartProductItem;

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    //marginHorizontal: 8,
    marginVertical: 5,
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row'
  },
  image: {
    flex: 2,
    height: 150,
    resizeMode: 'contain'
  },
  rightContainer: {
    flex: 3,
    padding: 10
  },
  title: {
    fontSize: 18,
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
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  star: {
    margin: 2,
  },
  quantityContainer: {
    margin: 15
  }
})