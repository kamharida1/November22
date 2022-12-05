import { FlatList, Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useCallback, useState } from 'react'

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = useWindowDimensions().width;

  const onFlatlistUpdate = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0)
    }
    //console.log(viewableItems);
  }, [])
  return (
    <View style={styles.root}>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Image
            style={[styles.image, { width: windowWidth - 40 }]}
            source={{ uri: item }}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth - 20}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        onViewableItemsChanged={onFlatlistUpdate}
      />

      <View style={styles.dots}>
        {images.map((image, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex ? '#c9c9c9' : '#ededed'
              }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel

const styles = StyleSheet.create({
  root: {},
  image: {
    height: 250,
    margin: 10,
    resizeMode: 'contain'
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 25,
    margin: 5,
    borderWidth: 1,
    backgroundColor: '#ededed',
    borderColor: '#c9c9c9',
  }
})