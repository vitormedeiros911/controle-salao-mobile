import React from 'react';
import { View, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome5 as Icon } from "@expo/vector-icons"

import { styles } from './styles';

const SearchBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Pesquisar..." style={styles.input}/>
      <RectButton style={styles.searchButton}>
        <Icon name="search" size={24} color="#fff"/>
      </RectButton>
    </View>
  );
}

export default SearchBar;
