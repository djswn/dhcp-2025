import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Selection from "../screens/Selection";
import DoctorDetail from "../screens/DoctorDetail";

const Stack = createStackNavigator();

export default function HomeStack({
  chatRooms,
  setChatRooms,
  reservations,
  setReservations,
}) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Selection"
        children={(props) => (
          <Selection
            {...props}
            chatRooms={chatRooms}
            setChatRooms={setChatRooms}
          />
        )}
      />

      <Stack.Screen
        name="DoctorDetail"
        children={(props) => (
          <DoctorDetail
            {...props}
            reservations={reservations}
            setReservations={setReservations}
          />
        )}
      />
    </Stack.Navigator>
  );
}
