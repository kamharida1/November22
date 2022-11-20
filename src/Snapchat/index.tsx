import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { createStackNavigator } from "@react-navigation/stack";
import Snapchat, { stories } from "./Snapchat";
import StoryComp from "./Story";
import { SnapchatRoutes } from "./Model";

export const assets = stories
  .map((story) => [story.avatar, story.source])
  .flat();

const Stack = createSharedElementStackNavigator<SnapchatRoutes>();
//const Stack = createStackNavigator<SnapchatRoutes>();
const Navigator = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: true,
      headerShown: false,
      cardOverlayEnabled: true,
      cardStyle: { backgroundColor: "transparent" },
      presentation: 'modal',
    }}
  >
    <Stack.Screen name="Snapchat" component={Snapchat} />
    <Stack.Screen
      name="Story"
      component={StoryComp}
      sharedElements={(route) => {
        const { id } = route.params.story
        return [id]
      }}
    />
  </Stack.Navigator>
);

export default Navigator;
