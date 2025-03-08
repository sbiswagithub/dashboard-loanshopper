import { View, Image, Platform } from "react-native";
import * as Linking from 'expo-linking';
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";

import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, WHITE } from "../../constants/colors";
import getStyleSheet from "../../styles/styles";

export default function Index({  }) {
  const styles = getStyleSheet();
  useEffect(() => {
    if (window.navigator?.userAgentData?.platform && window.navigator.userAgentData.platform.toUpperCase() === 'WINDOWS') {
      Linking.openURL('https://loanshopper.com.au')
    } else if (window.navigator?.userAgentData?.platform && window.navigator.userAgentData.platform.toUpperCase().match(/IPHONE|IPAD/) ) {
      Linking.openURL('https://apps.apple.com/au/app/loanshopper/id6464032507')
    } else if (window.navigator?.userAgentData?.platform && window.navigator.userAgentData.platform.toUpperCase().match(/ANDROID/) ) {
      Linking.openURL('https://play.google.com/store/apps/details?id=au.com.loanshopper')
    } else if (Platform?.OS.toUpperCase().match(/IOS/) ) {
      Linking.openURL('https://apps.apple.com/au/app/loanshopper/id6464032507')
    } else if (Platform?.OS.toUpperCase().match(/ANDROID/) ) {
      Linking.openURL('https://play.google.com/store/apps/details?id=au.com.loanshopper')
    } else
      Linking.openURL('https://loanshopper.com.au')

  })
  console.log(Platform?.OS)
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