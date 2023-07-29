import {
  View,
  Text,
  Image,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, WHITE } from "./../constants/colors";
import * as banners from "./../constants/banners";

import getStyleSheet from "./../styles/styles";

import { LinearGradient } from "expo-linear-gradient";
import { colors } from "react-native-elements";
import EmailSignIn from './EmailSignIn'

export default function Landing({ navigation }) {
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
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
      />

      <View
        style={[
          styles.centerItems,
          styles.evenlySpacedSingleColumn,
          { flex: 1 },
        ]}
      >

        <Image
          source={require("../assets/LoanShopper_LR.png")}
          style={styles.logoMastheadWide}
        />

          <View style={[styles.signInBannerBlock, {maxHeight:"70%"}]}>
						<EmailSignIn />

            <View style={[styles.signInBanner, {maxWidth:"90%", alignSelf:"center"}]}>
              <View style={{flex: 1,
                  flexDirection:'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between', }}>
                <Image style={[styles.tabIcon, {marginRight:10,}]} source={require('../assets/home.png')} />
               
                <View style={{flex: 1,
                  flexDirection:'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',maxWidth:"90%",}}>
                  <Text style={[styles.textMediumBoldLogoDarkBlue,]}>Secure</Text>
                  <Text style={[styles.textSmallWhite,]}>{banners.SIGNIN_BANNER_2}</Text>
                </View>
                </View>
              <View style={{flex: 1,
                  flexDirection:'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',maxWidth:"90%",}}>
                <Image style={[styles.tabIcon, {marginRight:10,}]} source={require('../assets/home.png')} />
                <View style={{flex: 1,
                  flexDirection:'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',}}>
                  <Text style={[styles.textMediumBoldLogoPaleBlue,]}>Universal</Text>
                <Text style={styles.textSmallWhite}>{banners.SIGNIN_BANNER_3}</Text>
                </View>
                </View>
              <View style={{flex: 1,
                  flexDirection:'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',}}>
                <Image style={[styles.tabIcon, {marginRight:10}]} source={require('../assets/home.png')} />
                <View style={{flex: 1,
                  flexDirection:'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',}}>
                  <Text style={[styles.textMediumBoldLogoBrightBlue,]}>Offers</Text>
                <Text style={styles.textSmallWhite}>{banners.SIGNIN_BANNER_4}</Text>
                </View>
                </View>
          </View>
        </View>
      </View>
    </View>
  );
}