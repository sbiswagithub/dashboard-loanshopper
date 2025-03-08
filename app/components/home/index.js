import {
  View,
  Image,
  Platform 
} from "react-native";


import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, WHITE } from "../../constants/colors";
import * as Linking from 'expo-linking';

import getStyleSheet from "../../styles/styles";

import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";


export default function Index({  }) {
  const styles = getStyleSheet();
  return (
    <View style={[styles.container, styles.evenlySpacedSingleColumn]}>
      <LinearGradient
        colors={[
          LOGO_DARK_BLUE,
          LOGO_BRIGHT_BLUE,
          WHITE
        ]}
        style={[styles.background]}
        start={{ x: 0.75, y: 1 }}
        end={{ x: 0.75, y: 0 }}
      />

      <View
        style={[
          {marginTop:'10%'},
          { flex: 1 },
        ]}
      >

        <Image
          source={require("../../../assets/images/LoanShopper_LR.png")}
          style={styles.logoMastheadWide}
        />


      </View>
    </View>
  );
}