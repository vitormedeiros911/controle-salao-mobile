import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { RectButton } from "react-native-gesture-handler";

interface FormProps {
  submit: () => void
}

const Form: React.FC<FormProps> = ({ children, submit }) => {
  return (
    <View style={styles.form}>
      {children}
      <RectButton style={styles.button} onPress={submit}>
        <Text style={styles.buttonTxt}>Salvar</Text>
      </RectButton>
    </View>
  );
};

export default Form;
