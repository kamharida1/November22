import React, { useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import {Feather} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, View } from 'react-native';
import RoundIconButton from '../components/RoundIconButton';
import Colors from '../utils/Colors';

const Stack = createNativeStackNavigator();

interface HeaderComponentProps {
  searchValue: string;
  setSearchValue: () => void;
}

const HeaderComponent = ({ searchValue, setSearchValue }: HeaderComponentProps) => {
  return (
    <SafeAreaView >
      <View
        style={{
          margin: 10,
          padding: 5,
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Feather name="search" size={20} />
        <TextInput
          style={{ height: 40, marginLeft: 10 }}
          placeholder="Search..."
          value={searchValue}
          onChangeText={setSearchValue}
        />
      </View>
    </SafeAreaView>
  );
};

const HomeStack = () => {
  const [searchValue, setSearchValue] = useState('');
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
        component={HomeScreen}
        name="Home"
        options={{
          headerRight: ({}) => (
            <RoundIconButton
              name="columns"
              size={30}
              color={'Colors.bgRoseDarker2'}
              backgroundColor={Colors.bgRoseWhite2}
              margin={5}
              padding={20}
              onPress={()=> {}}
            />
          ),
        }}
      />
      <Stack.Screen component={ProductScreen} name="ProductDetails" />
    </Stack.Navigator>
  );
};

export default HomeStack