import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, Alert } from "react-native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import { styles } from "./styles";

import { api } from "../../services/api";

import Header from "../../components/Header/index";
import AddButton from "../../components/AddButton";
import SearchBar from "../../components/SearchBar/index";
import Card from "../../components/Card";

export interface Schedule {
  id: number;
  date: Date;
  time: Date;
  clientId: number;
  procedureId: number;
  client: {
    name: string;
  };
  procedure: {
    name: string;
    cost: number;
  };
  status: string;
}

const ScheduleList: React.FC = () => {
  const { navigate } = useNavigation();

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [shouldDelete, setShouldDelete] = useState(false);

  const loadPage = async () => {
    const response = await api.get("schedule");

    setSchedules(response.data);
  };

  useEffect(() => {
    loadPage();
  }, []);

  const refreshList = async () => {
    setRefreshing(true);
    await loadPage();
    setRefreshing(false);
  };

  const handleDeleteSchedule = async (id: number) => {
    if (shouldDelete === true) {
      const response = await api.delete(`schedule/${id}`);

      if (response.status === 200) {
        Alert.alert("Deu certo!", "Agendento excluído com sucesso");
        refreshList();
      } else {
        Alert.alert("Erro!", `${response.data}`);
      }

      setShouldDelete(false);
    }
  };

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
          <FlatList
            data={schedules}
            onRefresh={refreshList}
            refreshing={refreshing}
            keyExtractor={(schedule) => String(schedule.id)}
            renderItem={({ item: schedule }) => (
              <Card
                key={String(schedule.id)}
                onDeletePress={() => {
                  Alert.alert("Confirmar", "Deseja deletar o agendamento?", [
                    { text: "Não", onPress: () => setShouldDelete(false) },
                    {
                      text: "Sim",
                      onPress: () => {
                        handleDeleteSchedule(schedule.id);
                        setShouldDelete(true);
                      },
                    },
                  ]);
                }}
                onEditPress={() =>
                  navigate("Agendar", { scheduleId: schedule.id })
                }
              >
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
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ScheduleList;
