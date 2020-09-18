import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, Alert } from "react-native";
import { Picker } from "@react-native-community/picker";
import { useRoute } from "@react-navigation/native";
import { AxiosResponse } from "axios";
import moment from "moment";

import { api } from "../../services/api";

import { styles } from "./styles";

import Header from "../../components/Header";
import Form from "../../components/Form";
import DatePicker from "../../components/Date_TimePicker/DatePicker";
import TimePicker from "../../components/Date_TimePicker/TimePicker";

import { Schedule } from "../Schedule/index";

interface Client {
  id: number;
  name: string;
}

interface Procedure {
  id: number;
  name: string;
}

interface Params {
  scheduleId?: number;
}

const CreateSchedule: React.FC = () => {
  const { params } = useRoute();

  const { scheduleId } = (params as Params) ?? {};

  const [allClients, setAllClients] = useState<Client[]>([]);
  const [allProcedures, setAllProcedures] = useState<Procedure[]>([]);
  const [clientId, setClientId] = useState(0);
  const [procedureId, setProcedureId] = useState(0);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [status, setStatus] = useState(String);

  useEffect(() => {
    api.get("client").then((response) => {
      setAllClients(response.data);
    });

    api.get("procedure/all").then((response) => {
      setAllProcedures(response.data);
    });
  }, []);

  useEffect(() => {
    if (scheduleId) {
      api
        .get(`schedule/${scheduleId}`)
        .then((response: AxiosResponse<Schedule>) => {
          setClientId(response.data.clientId);
          setProcedureId(response.data.procedureId);
          setDate(new Date(response.data.date));
          setTime(new Date(response.data.time));
          setStatus(response.data.status);
        })
        .catch((response) => {
          Alert.alert("Erro", `${response.data}`);
        });
    }
  }, [scheduleId]);

  const handleSubmitSchedule = () => {
    if (scheduleId) {
      api
        .patch(`schedule/edit/${scheduleId}`, {
          date,
          time: moment(time).format("HH:mm:ss"),
          clientId,
          procedureId,
          status,
        })
        .then(() => {
          Alert.alert("Sucesso", "Agendamento atualizado com sucesso");
        })
        .catch((response) => {
          Alert.alert("Erro", `${response.message}`);
        });
    } else {
      api
        .post("schedule/new", {
          date,
          time: moment(time).format("HH:mm:ss"),
          clientId,
          procedureId,
        })
        .then(() => {
          Alert.alert("Sucesso", "Agendamento feito com sucesso");
        })
        .catch((response) => {
          Alert.alert("Erro", `${response.message}`);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Text style={styles.subTitle}>Agendar</Text>
        </View>
        <Form submit={handleSubmitSchedule}>
          <Text style={styles.label}>Data</Text>
          <DatePicker
            date={date}
            handleDateChange={(date) => setDate(new Date(date))}
          />
          <Text style={styles.label}>Horário</Text>
          <TimePicker
            time={time}
            handleTimeChange={(time) => setTime(new Date(time))}
          />
          <Text style={styles.label}>Cliente</Text>
          <Picker
            style={styles.input}
            selectedValue={clientId}
            onValueChange={(value, _i) => {
              setClientId(Number(value));
            }}
          >
            {allClients.length === 0 ? (
              <Picker.Item label="Nenhum cliente encontrado" value="" />
            ) : (
              allClients.map((client: Client) => (
                <Picker.Item
                  key={client.id}
                  label={client.name}
                  value={client.id}
                />
              ))
            )}
          </Picker>
          <Text style={styles.label}>Procedimento</Text>
          <Picker
            style={styles.input}
            selectedValue={procedureId}
            onValueChange={(value, _i) => setProcedureId(Number(value))}
          >
            {allProcedures.length === 0 ? (
              <Picker.Item label="Nenhum procedimento encontrado" value="" />
            ) : (
              allProcedures.map((procedure: Procedure) => (
                <Picker.Item
                  key={procedure.id}
                  label={procedure.name}
                  value={procedure.id}
                />
              ))
            )}
          </Picker>
        </Form>
      </View>
    </SafeAreaView>
  );
};

export default CreateSchedule;
