import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import moment from "moment";

import { styles } from "./styles";

import { api } from "../../services/api";

import Header from "../../components/Header/index";
import AddButton from "../../components/AddButton";
import SearchBar from "../../components/SearchBar/index";
import Card from "../../components/Card";

interface Schedule {
  id: number;
  date: Date;
  time: string;
  client: {
    name: string;
  };
  procedure: {
    name: string;
    cost: number;
  };
  status: string;
}

const Schedule: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    api.get("schedule").then((response) => {
      if (response.status === 200) {
        setSchedules(response.data);
      }
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Text style={styles.subTitle}>Agendamentos</Text>
          <AddButton page="Agendar" />
        </View>
        <SearchBar />
        {schedules.length === 0 ? (
          <View style={styles.noneContent}>
            <Icon name="exclamation-triangle" size={50} color="#c9c9c9" />
            <Text style={{ marginTop: 12, color: "#6e6e6e" }}>
              Nenhum Agendamento encontrado!
            </Text>
          </View>
        ) : (
          <ScrollView>
            {schedules.map((schedule: Schedule) => (
              <Card key={String(schedule.id)}>
                <Text style={[styles.text, { fontSize: 16 }]}>
                  Horário: {moment(schedule.date).format("DD/MM/YYYY")} -{" "}
                  {schedule.time}
                </Text>
                <Text style={styles.text}>Cliente: {schedule.client.name}</Text>
                <Text style={styles.text}>
                  Procedimento: {schedule.procedure.name}
                </Text>
                <Text style={styles.text}>
                  Preço: R$ {schedule.procedure.cost}
                </Text>
                <Text style={styles.text}>Status: {schedule.status}</Text>
              </Card>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Schedule;
