import React from "react";
import {Pressable, Text, View} from 'react-native'

const Chip = ({ text, onPress }) => {
  return (
    <Pressable
      style={{
        //width: 120,
        borderRadius: 15,
        backgroundColor: "rgba(0,0,0,0.7)",
        paddingVertical: 8,
        marginVertical: 20,
        paddingHorizontal: 15,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: "rgba(255,255,255,0.8)",
          alignSelf: "center",
          fontSize: 14,
          fontWeight: "600",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
export default Chip
