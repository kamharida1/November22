import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import SnapchatStack, { assets as snapChatAssets } from "./src/Snapchat";
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './src/Routes';
import LoadAssets from './src/components/LoadAssets';
import TwitterProfile from './src/TwitterProfile';
import MovieCarousel from './src/MovieCarousel';
import Snapchat from './src/Snapchat';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Router from './src/Ecom';
import { RootSiblingParent } from "react-native-root-siblings";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";

import awsExports from "./src/aws-exports";
import TodoApp from './src/TodoApp';
import Colors from './src/Ecom/utils/Colors';
Amplify.configure(awsExports);


const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SFPro/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SFPro/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SFPro/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SFPro/SF-Pro-Display-Medium.otf"),
  "SFProRounded-Semibold": require("./assets/fonts/SFProRounded/SF-Pro-Rounded-Semibold.otf"),
  "SFProRounded-Medium": require("./assets/fonts/SFProRounded/SF-Pro-Rounded-Medium.otf"),
  "Nunito-Bold": require("./assets/fonts/Nunito/Nunito-Bold.ttf"),
  "Nunito-Regular": require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
  "GothamRounded-Medium": require("./assets/fonts/GothamRounded/GothamRounded-Medium.otf"),
  "GothamRounded-Bold": require("./assets/fonts/GothamRounded/GothamRounded-Bold.otf"),
  "GothamRounded-Light": require("./assets/fonts/GothamRounded/GothamRounded-Light.otf"),
};

const assets = [
  ...snapChatAssets,
];

const Stack = createStackNavigator<Routes>();
const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Snapchats"
      component={SnapchatStack}
      options={{
        title: "Snapchat",
        header: () => null,
      }}
    />
  </Stack.Navigator>
)

export default function App() {
  return (
    // <LoadAssets assets={assets} fonts={fonts}>
    //   <Snapchat />
    // </LoadAssets>
    <Authenticator.Provider>
      <Authenticator>
        <RootSiblingParent>
          <SafeAreaProvider style={{ flex: 1, backgroundColor: Colors.bgRoseWhite2 }}>
            <TodoApp />
          </SafeAreaProvider>
        </RootSiblingParent>
      </Authenticator>
    </Authenticator.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
