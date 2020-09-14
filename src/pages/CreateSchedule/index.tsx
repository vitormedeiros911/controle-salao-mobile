import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, Alert } from "react-native";
import { Picker } from "@react-native-community/picker";
import moment from "moment";

import Header from "../../components/Header";
import Form from "../../components/Form";

import { api } from "../../services/api";

import { styles } from "./styles";
import DatePicker from "../../components/Date_TimePicker/DatePicker";
import TimePicker from "../../components/Date_TimePicker/TimePicker";

import { Schedule } from "../Schedule";

interface Client {
  id: number;
  name: string;
}

interface Procedure {
  id: number;
  name: string;
}

interface CreateScheduleProps {
  isEdit?: boolean;
  schedule: Schedule;
}

const CreateSchedule: React.FC<CreateScheduleProps> = ({
  isEdit,
  schedule,
}) => {
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [allProcedures, setAllProcedures] = useState<Procedure[]>([]);
  const [clientId, setClientId] = useState<number>(0);
  const [procedureId, setProcedureId] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [status, setStatus] = useState(String);

  if (isEdit && schedule) {
    setClientId(schedule.clientId);
    setProcedureId(schedule.procedureId);
    setDate(schedule.date);
    setTime(new Date(schedule.time));
    setStatus(schedule.status);
  }

  useEffect(() => {
    api.get("client").then((response) => {
      setAllClients(response.data);
    });

    api.get("procedure/all").then((response) => {
      setAllProcedures(response.data);
    });
  }, []);

  const handleSubmitSchedule = () => {
    if (isEdit && schedule) {
      api
        .patch(`schedule/edit/${schedule.id}`, {
          date,
          time: moment(time).format("HH:mm:ss"),
          clientId,
          procedureId,
          status
        })
        .then(() => {
          Alert.alert("Sucesso", "Agendamento atualizado com sucesso");
        })
        .catch((response) => {
          Alert.alert("Erro", `${response.data}`);
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
          Alert.alert("Erro", `${response.data}`);
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
