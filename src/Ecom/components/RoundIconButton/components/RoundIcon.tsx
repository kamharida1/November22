import { StyleSheet, Text, View } from 'react-native'
import React from 'react' 
import {Feather as Icon} from '@expo/vector-icons'

export interface RoundIconProps {
  name: string;
  size: number;
  color: string;
  backgroundColor?: string;
  iconRatio?: number;
  align?: "center" | "flex-start" | "flex-end";
  margin?: number;
  padding?: number;
}

const RoundIcon = ({
  name,
  size,
  color,
  backgroundColor,
  iconRatio,
  align,
  margin,
  padding
}: RoundIconProps) => {
  const iconSize = size * iconRatio;

  return (
    <View
      style={{
        height: size,
        width: size,
        justifyContent: 'center',
        alignItems: align,
        backgroundColor: backgroundColor,
        borderRadius: size*2 / 2,
        padding: padding,
        margin: margin
      }}
    >
      <Text
        style={{
          width: iconSize,
          height: iconSize,
          color: color
        }}>
        <Icon size={iconSize} {...{ name }} />
      </Text>
    </View>
  );
};

RoundIcon.defaultProps = {
  iconRatio: 0.7,
  align: 'center'
};

export default RoundIcon

