import React from "react";
import { View, Text, SafeAreaView } from "react-native";

import { styles } from "./styles";

import Header from "../../components/Header/index";
import AddButton from "../../components/AddButton";
import SearchBar from '../../components/SearchBar/index';
import { ScrollView } from "react-native-gesture-handler";
import Card from "../../components/Card";

const Schedule: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Text style={styles.subTitle}>Agendamentos</Text>
          <AddButton />
        </View>
        <SearchBar />
        <ScrollView>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Schedule;
