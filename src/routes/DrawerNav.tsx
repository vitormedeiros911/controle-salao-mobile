import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome5 as Icon } from "@expo/vector-icons";

import ScheduleList from "../pages/ScheduleList";
import CreateSchedule from "../pages/CreateSchedule";

const { Navigator, Screen } = createDrawerNavigator();

const DrawerNav: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Agendamentos"
        drawerStyle={{ backgroundColor: "#816AC3" }}
        drawerContentOptions={{
          activeBackgroundColor: "#a184f5",
          itemStyle: {
            marginVertical: 5,
            borderBottomColor: "#fff",
          },
          labelStyle: { color: "#fff", fontSize: 14 },
        }}
      >
        <Screen
          name="Agendamentos"
          component={ScheduleList}
          options={{
            drawerIcon: () => (
              <Icon name="calendar-alt" color="#fff" size={24} />
            ),
          }}
        />
        <Screen
          name="Agendar"
          component={CreateSchedule}
          options={{
            drawerIcon: () => (
              <Icon name="calendar-alt" color="#fff" size={24} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default DrawerNav;
