import React from "react";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

import { styles } from "./styles";
import { Text } from "react-native";

interface AddButtonProps {
  page: string
}

const AddButton: React.FC<AddButtonProps> = ({ page }) => {
  const navigation = useNavigation()
  return (
    <RectButton style={styles.button} onPress={() => navigation.navigate(page)}>
      <Icon name="plus" size={24} color="#fff" />
      <Text style={styles.text}>Adicionar</Text>
    </RectButton>
  );
};

export default AddButton;
