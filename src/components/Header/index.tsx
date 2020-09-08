import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import { styles } from "./styles";

const Header: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <RectButton
        onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
        style={styles.bars}
      >
        <Icon name="bars" size={24} color="#fff" />
      </RectButton>
      <Text style={styles.title}>Irany Cabeleireira</Text>
      <Icon name="sign-out-alt" size={24} color="#fff" />
    </View>
  );
};

export default Header;
