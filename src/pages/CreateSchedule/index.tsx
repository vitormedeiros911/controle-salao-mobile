import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, Platform, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RectButton } from "react-native-gesture-handler";
import { Picker } from "@react-native-community/picker";
import moment from "moment";

import Header from "../../components/Header";
import Form from "../../components/Form";

import { api } from "../../services/api";

import { styles } from "./styles";

interface Client {
  id: number;
  name: string;
}

interface Procedure {
  id: number;
  name: string;
}

const CreateSchedule: React.FC = () => {
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [allProcedures, setAllProcedures] = useState<Procedure[]>([]);
  const [clientId, setClientId] = useState<number>(0);
  const [procedureId, setProcedureId] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [dateString, setDateString] = useState(
    moment(new Date()).format("DD/MM/YYYY")
  );
  const [timeString, setTimeString] = useState(
    moment(new Date()).format("HH:mm")
  );
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  useEffect(() => {
    api.get("client").then((response) => {
      setAllClients(response.data);
    });

    api.get("procedure/all").then((response) => {
      setAllProcedures(response.data);
    });
  }, []);

  const getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={date}
        onChange={(_, date: any) => {
          setShowDatePicker(false);
          setDate(new Date(date));
          setDateString(moment(date).format("DD/MM/YYYY"));
        }}
        minimumDate={new Date()}
        mode="date"
        locale="pt-br"
      />
    );

    if (Platform.OS === "android") {
      datePicker = (
        <View>
          <RectButton
            onPress={() => setShowDatePicker(true)}
            style={styles.input}
          >
            <Text>{dateString}</Text>
          </RectButton>
          {showDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  const getTimePicker = () => {
    let timePicker = (
      <DateTimePicker
        value={time}
        onChange={(_, time: any) => {
          setShowTimePicker(false);
          setTime(new Date(time));
          setTimeString(moment(time).format("HH:mm"));
        }}
        mode="time"
        locale="pt-br"
        is24Hour
      />
    );

    if (Platform.OS === "android") {
      timePicker = (
        <View>
          <RectButton
            onPress={() => setShowTimePicker(true)}
            style={styles.input}
          >
            <Text>{timeString}</Text>
          </RectButton>
          {showTimePicker && timePicker}
        </View>
      );
    }

    return timePicker;
  };

  const handleSubmitSchedule = () => {
    api
      .post("schedule/new", {
        date,
        clientId,
        procedureId,
      })
      .then(() => {
        Alert.alert("Sucesso", "Agendamento feito com sucesso");
      })
      .catch((response) => {
        Alert.alert("Erro", `${response.message}`);
      });
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
          {getDatePicker()}
          <Text style={styles.label}>Horário</Text>
          {getTimePicker()}
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
