import { StyleSheet, Text, View, Animated, ImageBackground, Image } from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

function generateTweets(limit) {
  return new Array(limit).fill(0).map((_, index) => {
    const repetitions = Math.floor(Math.random() * 3) + 1;

    return {
      key: index.toString(),
      text: 'Lorem ipsum dolor amet'.repeat(repetitions),
      author: 'Arnaud',
      tag: 'eveningkid'
    }
  });
}

const TWEETS = generateTweets(30);
const HEADER_HEIGHT_EXPANDED = 350;
const HEADER_HEIGHT_NARROWED = 90;

const PROFILE_PICTURE_URI =
  'https://pbs.twimg.com/profile_images/975388677642715136/7Hw2MgQ2_400x400.jpg';

const PROFILE_BANNER_URI= "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function WrappedApp() {
  // Keeps notches away
  return (
    <SafeAreaProvider>
      <TwitterProfile />
    </SafeAreaProvider>
  )
}

const TwitterProfile = () => {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Back button */}
      <View
        style={{
          zIndex: 2,
          position: "absolute",
          top: insets.top,
          left: 20,
          height: 40,
          width: 40,
          backgroundColor: "rgba(255,255,255,0.2)",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Feather name="chevrons-left" color="white" size={26} />
      </View>
      {/* Refresh arrow */}
      <Animated.View
        style={{
          zIndex: 2,
          position: "absolute",
          top: insets.top + 13,
          left: 0,
          right: 0,
          alignItems: "center",
          opacity: scrollY.interpolate({
            inputRange: [-20, 0],
            outputRange: [1, 0],
          }),
          transform: [
            {
              rotate: scrollY.interpolate({
                inputRange: [-45, -35],
                outputRange: ["180deg", "0deg"],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <Feather name="arrow-down" color="white" size={25} />
      </Animated.View>
      {/* Name + tweets count */}
      <Animated.View
        style={{
          zIndex: 2,
          position: "absolute",
          top: insets.top + 6,
          left: 0,
          right: 0,
          alignItems: "center",
          opacity: scrollY.interpolate({
            inputRange: [HEADER_HEIGHT_EXPANDED, 400],
            outputRange: [0, 1],
          }),
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [HEADER_HEIGHT_EXPANDED, 400],
                outputRange: [-30, 0],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <Text style={[styles.text, styles.username]}>Arnaud</Text>
        <Text style={[styles.text, styles.tweetsCount]}>379 tweets</Text>
      </Animated.View>
      {/* Banner */}
      <AnimatedImageBackground
        source={{ uri: PROFILE_BANNER_URI }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED,
          transform: [
            {
              scale: scrollY.interpolate({
                inputRange: [-200, 0],
                outputRange: [5, 1],
                extrapolate: "extend",
                extrapolateRight: "clamp",
              }),
            },
          ],
        }}
      >
        <AnimatedBlurView
          tint="dark"
          intensity={96}
          style={{
            ...StyleSheet.absoluteFillObject,
            zIndex: 2,
            opacity: scrollY.interpolate({
              inputRange: [-150, 0, 100, 250],
              outputRange: [1, 0, 0, 1],
            }),
          }}
        />
      </AnimatedImageBackground>
      {/* Tweets profile */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollY },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        style={{
          zIndex: 3,
          marginTop: HEADER_HEIGHT_NARROWED,
          paddingTop: HEADER_HEIGHT_EXPANDED,
        }}
      >
        <Animated.View style={[styles.container, { backgroundColor: "black" }]}>
          <View
            style={[
              styles.container,
              {
                paddingHorizontal: 20,
              },
            ]}
          >
            <Animated.Image
              source={{
                uri: PROFILE_PICTURE_URI,
              }}
              style={{
                width: 75,
                height: 75,
                borderRadius: 40,
                borderWidth: 4,
                borderColor: "black",
                marginTop: -30,
                transform: [
                  {
                    scale: scrollY.interpolate({
                      inputRange: [0, HEADER_HEIGHT_EXPANDED],
                      outputRange: [1, 0.6],
                      extrapolate: "clamp",
                    }),
                  },
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [0, HEADER_HEIGHT_EXPANDED],
                      outputRange: [0, 25],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              }}
            />
            <Animated.Text
              style={[
                styles.text,
                {
                  fontSize: 24,
                  fontWeight: "bold",
                  marginTop: 10,
                },
              ]}
            >
              Arnaud
            </Animated.Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 15,
                  color: "gray",
                  marginBottom: 15,
                },
              ]}
            >
              @eveningkid
            </Text>
            <Text style={[styles.text, { marginBottom: 15, fontSize: 15 }]}>
              Same @ on every social media
            </Text>
            {/* Profile stats */}
            <View
              style={{
                flexDirection: "row",
                marginBottom: 15,
              }}
            >
              <Text
                style={[
                  styles.text,
                  {
                    fontWeight: "bold",
                    marginRight: 10,
                  },
                ]}
              >
                {" "}
                70{" "}
                <Text
                  style={{
                    color: "gray",
                    fontWeight: "normal",
                  }}
                >
                  Following
                </Text>
              </Text>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                106{" "}
                <Text
                  style={{
                    color: "gray",
                    fontWeight: "normal",
                  }}
                >
                  Followers
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.container}>
            {TWEETS.map((item, index) => (
              <View key={item.key} style={styles.tweet}>
                <Image
                  source={{ uri: PROFILE_PICTURE_URI }}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    marginRight: 10,
                  }}
                />
                <View style={styles.container}>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontWeight: "bold",
                        fontSize: 15,
                      },
                    ]}
                  >
                    {item.author}{" "}
                    <Text
                      style={{
                        color: "gray",
                        fontWeight: "normal",
                      }}
                    >
                      @{item.tag} . {index + 1}d
                    </Text>
                  </Text>
                  <Text style={[styles.text, { fontSize: 15 }]}>
                    {item.text}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: 'white',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -3
  },
  tweetsCount: {
    fontSize: 13
  },
  tweet: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.25)'
  },
})