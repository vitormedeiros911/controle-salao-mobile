import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";

import { styles } from "./styles";

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Icon name="bars" size={24} color="#fff" />
      <Text style={styles.title}>Irany Cabeleireira</Text>
      <Icon name="sign-out-alt" size={24} color="#fff" />
    </View>
  );
};

export default Header;
