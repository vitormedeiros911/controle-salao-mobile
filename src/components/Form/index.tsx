import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { RectButton } from "react-native-gesture-handler";

const Form: React.FC = ({ children }) => {
  return (
    <View style={styles.form}>
      {children}
      <RectButton style={styles.button}>
        <Text style={styles.buttonTxt}>Salvar</Text>
      </RectButton>
    </View>
  );
};

export default Form;
