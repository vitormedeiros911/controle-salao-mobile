import React from "react";
import { View, Text } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

import { styles } from "./styles";

interface CardProps {
  onDeletePress?: () => void;
  onEditPress?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  onDeletePress,
  onEditPress,
}) => {
  const getLeftContent = () => {
    return (
      <RectButton style={styles.leftContent} onPress={onEditPress}>
        <Icon name="edit" size={24} color="#fff" />
        <Text style={[styles.text, { color: "#fff" }]}>Editar</Text>
      </RectButton>
    );
  };

  const getRightContent = () => {
    return (
      <RectButton style={styles.rightContent} onPress={onDeletePress}>
        <Icon name="trash-alt" size={24} color="#fff" />
        <Text style={[styles.text, { color: "#fff" }]}>Excluir</Text>
      </RectButton>
    );
  };

  return (
    <Swipeable
      renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      friction={2.5}
    >
      <View style={styles.container}>{children}</View>
    </Swipeable>
  );
};

export default Card;
