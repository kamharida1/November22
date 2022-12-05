import React from 'react';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import AddressScreen from '../screens/AddressScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();


const ShoppingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: true,
        headerTransparent: true,
        headerBlurEffect: "systemChromeMaterial",
      }}
    >
      <Stack.Screen
        options={{ title: "Shopping Cart" }}
        name="Cart"
        component={ShoppingCartScreen}
      />
      <Stack.Screen
        options={{ title: "Address" }}
        component={AddressScreen}
        name="Address"
      />
    </Stack.Navigator>
  );
};

export default ShoppingStack;