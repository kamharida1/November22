import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ITEMS } from '../../data/dummy'
import products from '../../data/products';
import Colors from '../../utils/Colors';
import { ResizeMode } from 'expo-av';

const Grid_Header = () => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "rgba(190,190,190,0.3)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        borderRadius: 15,
        paddingVertical: 15
      }}
    >
      <Text style={{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
      }}>
        My Products
      </Text>
    </View>
  );
};
const GridView = ({ data }) => (
  <View style={styles.gridBox}>
    <Text
      style={styles.gridText}
      onPress={() => {
        getOnPressItem(data);
      }}
    >
      {data}
    </Text>
  </View>
);
const ProductBox = ({ product }) => (
  <View style={styles.gridBox}>
    <Text
      style={styles.text}
      numberOfLines={2}
    >
      {product.title}
    </Text>
    <Image
      source={{ uri: product.image }}
      style={{
        resizeMode: "cover",
        borderRadius: 15,
        flex: 1,
      }}
    />
    <View style={styles.overlay} />
  </View>
);


const getOnPressItem = (data) => {
  Alert.alert(data);
};


const ProductList = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductBox product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={Grid_Header}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

export default ProductList

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 60,
    padding: 15
  },
  gridBox: {
    flex: 1,
    height: 200,
    margin: 8,
    //backgroundColor: Colors.bgRoseDarker1,
    //justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0,0,0,0.2)",
  },
  gridText: {
    fontSize: 24,
    color: "white",
  },
  text: {
    position: "absolute",
    zIndex: 3,
    alignSelf: "center",
    padding: 5,
    color: Colors.bgRoseWhite1,
    fontWeight: "700",
    letterSpacing: .2,
    fontSize: 15,
    bottom: 3,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 15,
  },
});