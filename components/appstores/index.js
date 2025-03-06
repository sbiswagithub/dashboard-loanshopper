import {
  View,
  Text,
  Image,
} from "react-native";


import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, WHITE } from "../../constants/colors";
import * as banners from "../../constants/banners";
import * as Linking from 'expo-linking';

import getStyleSheet from "../../styles/styles";

import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";


export default function Index({ navigation }) {
  const styles = getStyleSheet();
  useEffect(() => {
    if (window.navigator?.userAgentData?.platform && window.navigator.userAgentData.platform.toUpperCase() === 'WINDOWS') {
      Linking.openURL('https://loanshopper.com.au')
    } else if (window.navigator?.platform && window.navigator.platform.toUpperCase().match(/(IPHONE|IPAD)/) ) {
      Linking.openURL('https://apps.apple.com/au/app/loanshopper/id6464032507')
    } else if (window.navigator?.userAgent && window.navigator.userAgent.toUpperCase().indexOf('ANDROID')) {
      Linking.openURL('https://play.google.com/store/apps/details?id=au.com.loanshopper')
    } 

  })
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
          source={require("../../assets/LoanShopper_LR.png")}
          style={styles.logoMastheadWide}
        />


      </View>
    </View>
  );
}