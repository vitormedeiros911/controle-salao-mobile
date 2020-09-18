import React, { useState } from "react";
import { Platform, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RectButton } from "react-native-gesture-handler";
import moment from "moment";

import { styles } from "./styles";

interface DatePickerProps {
  date: Date;
  handleDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ date, handleDateChange }) => {
  const [dateString, setDateString] = useState(
    moment(date).format("DD/MM/YYYY")
  );
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  let datePicker = (
    <DateTimePicker
      value={date}
      onChange={(_, date: any) => {
        setShowDatePicker(false);
        handleDateChange(date);
        setDateString(moment(date).format("DD/MM/YYYY"));
      }}
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

export default DatePicker;
