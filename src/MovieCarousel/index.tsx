import { ActivityIndicator, Dimensions, Platform, FlatList, StyleSheet, Text, View, Image, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import {LinearGradient} from 'expo-linear-gradient'

import { getMovies } from './api'
import Genres from './components/Genres'
import Rating from './components/Rating'
import { StatusBar } from 'expo-status-bar'

const { width, height } = Dimensions.get('window');
//console.log(width, height);
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator />
  </View>
);

const Backdrop = ({ movies, scrollX }) => { 
  return (
    <View style={{height: BACKDROP_HEIGHT, width, position: 'absolute'}}>
      <FlatList
        data={movies.reverse()}
        removeClippedSubviews={false}
        keyExtractor={(item) => item.key + '-backdrop'}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
          })
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden'
              }}
            >
              <Image
                source={{ uri: item.backdrop }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute'
                }}
              />
            </Animated.View>
          )
        }}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0
        }}
      />
    </View>
  )
};

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      setMovies([{ key: 'empty-left' }, ...movies, { key: 'empty-right' }])
    };

    if (movies.length === 0) {
      fetchData()
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <StatusBar hidden />
      <Animated.FlatList
        data={movies}
        contentContainerStyle={{ alignItems: 'center'}}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item) => item.key}
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        snapToInterval={ITEM_SIZE}
        snapToAlignment='start'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {useNativeDriver: false}
        )}
        scrollEventThrottle={16}
        renderToHardwareTextureAndroid
        renderItem={({item, index}) => {
          if (!item.poster) {
            return <View style={{ width: EMPTY_ITEM_SIZE}} />
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE
          ]

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: 'clamp'
          })

          return (
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  backgroundColor: '#fff',
                  padding: SPACING * 2,
                  alignItems: 'center',
                  borderRadius: 34,
                  transform: [{ translateY }]
                }}
              >
                <Image
                  source={{ uri: item.poster }}
                  style={ styles.posterImage}
                />
                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Rating rating={item.rating} />
                <Genres genres={item.genres} />
                <Text style={{ fontSize: 12}} numberOfLines={3}>
                  {item.description}
                </Text>
              </Animated.View>
            </View>
          )
        }}
      />
    </View>
  )
}

export default MovieCarousel

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    marginBottom: 10,
    margin: 0
  },
})