import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import UserTypeSelection from "../(home)/userTypeSelection";
import HistoryList from "../(seller)/history";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="UserTypeSelection" component={UserTypeSelection} />
      <Tab.Screen name="History" component={HistoryList} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
