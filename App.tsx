import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import DrawerNav from './src/routes/DrawerNav';

const customFonts = {
  Sedan: require("./assets/fonts/Sedan-Regular.ttf"),
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(customFonts);
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <StatusBar style="light" translucent />
        <DrawerNav />
      </>
    );
  }
}
