import React, { useState } from 'react';
import { Platform, Text, View } from 'react-native'
import DateTimePicker from "@react-native-community/datetimepicker";
import { RectButton } from "react-native-gesture-handler";
import moment from "moment";

import { styles } from './styles';

interface TimePickerProps {
  time: Date
  handleTimeChange: (time: any) => void
}

const TimePicker: React.FC<TimePickerProps> = ({ time, handleTimeChange }) => {
  const [timeString, setTimeString] = useState(
    moment(new Date()).format("HH:mm")
  );
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  let timePicker = (
    <DateTimePicker
      value={time}
      onChange={(_, time: any) => {
        setShowTimePicker(false);
        handleTimeChange(time);
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
}

export default TimePicker;
