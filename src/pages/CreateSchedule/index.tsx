import React, { useState } from "react";
import { View, SafeAreaView, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from "@react-navigation/native";
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

const CreateSchedule: React.FC = () => {
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState<number>(0);
  const [date, setDate] = useState<any>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useFocusEffect(() => {
    api.get("client").then((response) => {
      if (response.status === 200) {
        setAllClients(response.data);
      }
    });
  });

  const getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={date}
        onChange={(_, date?: Date) => {
          setDate(date);
          setShowDatePicker(false);
        }}
        mode="datetime"
        locale="pt-br"
      />
    );

    const dateString = moment(date).format("D [do] MM [de] YYYY");

    if (Platform.OS === "android") {
      datePicker = (
        <View>
          <RectButton
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.date}>{dateString}</Text>
          </RectButton>
          {showDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Text style={styles.subTitle}>Agendar</Text>
        </View>
        <Form>
          {getDatePicker()}
          <Picker
            style={styles.input}
            selectedValue={clientId}
            onValueChange={(value, _i) =>
              setClientId(Number(value))
            }
          >
            {allClients.map((client: Client) => (
              <Picker.Item
                key={client.id}
                label={client.name}
                value={client.id}
              />
            ))}
          </Picker>
        </Form>
      </View>
    </SafeAreaView>
  );
};

export default CreateSchedule;
