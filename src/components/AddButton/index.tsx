import React from "react";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome5 as Icon } from "@expo/vector-icons";

import { styles } from "./styles";
import { Text } from "react-native";

const AddButton: React.FC = () => {
  return (
    <RectButton style={styles.button}>
      <Icon name="plus" size={24} color="#fff" />
      <Text style={styles.text}>Adicionar</Text>
    </RectButton>
  );
};

export default AddButton;
