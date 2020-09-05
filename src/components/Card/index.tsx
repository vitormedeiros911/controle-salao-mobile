import React from 'react';
import { View, Text } from 'react-native';
import Swipeable from "react-native-gesture-handler/Swipeable"
import { FontAwesome5 as Icon } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler';

import { styles } from './styles';

const getLeftContent = () => {
  return (
    <RectButton style={styles.leftContent}>
      <Icon name="edit" size={24} color="#fff"/>
      <Text style={[styles.text, { color: "#fff" }]}>Editar</Text>
    </RectButton>
  )
}

const getRightContent = () => {
  return (
    <RectButton style={styles.rightContent}>
      <Icon name="trash-alt" size={24} color="#fff"/>
      <Text style={[styles.text, { color: "#fff" }]}>Excluir</Text>
    </RectButton>
  )
}

const Card: React.FC = () => {
  return (
    <Swipeable renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      friction={2}
    >
      <View style={styles.container}>
        <Text style={[styles.text, { fontSize: 16 }]}>Horário: xx/xx/xxxx</Text>
        <Text style={styles.text}>Cliente: Zé</Text>
        <Text style={styles.text}>Preço: R$ 30,00</Text>
        <Text style={styles.text}>Status: AGENDADO</Text>
      </View>
    </Swipeable>
  );
}

export default Card;
