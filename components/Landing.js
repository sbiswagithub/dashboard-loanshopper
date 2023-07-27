import {
  View,
  Text,
  TouchableHighlight,
  Image,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, WHITE } from "./../constants/colors";
import * as banners from "./../constants/banners";

import getStyleSheet from "./../styles/styles";

import { LinearGradient } from "expo-linear-gradient";
import { colors } from "react-native-elements";
export default function Landing({ navigation }) {
  const styles = getStyleSheet();

  return (
    <View style={[styles.container, styles.evenlySpacedSingleColumn]}>
      <LinearGradient
        colors={[
          LOGO_BRIGHT_BLUE,
          LOGO_DARK_BLUE,
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


        <TouchableHighlight
          style={[
            styles.alignCenter,
            styles.tableRow,
            styles.p2,
            { flexDirection: "row", borderRadius: 10 },
          ]}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
          underlayColor={colors.white}
        >
          <>
            <View
              style={[styles.iconWrapper, styles.centerItems, styles.bgWhite]}
            >
              <Icon.Button
                name="home-city-outline"
                size={20}
                borderRadius={25}
                backgroundColor={WHITE}
                color={"black"}
                iconStyle={{ margin: 8 }}
              />
            </View>
            <View style={[styles.tableColumn70pct]}>
              <Text
                style={[
                  styles.textMediumBoldLogoPaleBlue,
                  styles.textCenter,
                  styles.p2,
                ]}
              >Welcome !</Text>
            </View>
          </>
        </TouchableHighlight>


        <Image
          source={require("../assets/LoanShopper_LR.png")}
          style={styles.logoMastheadWide}
        />

          <View style={[styles.signInBannerBlock, {maxHeight:"40%"}]}>
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
                  <Text style={[styles.textMediumBoldLogoBrightBlue,]}>Secure</Text>
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
                  <Text style={[styles.textMediumBoldLogoDarkBlue,]}>Offers</Text>
                <Text style={styles.textSmallWhite}>{banners.SIGNIN_BANNER_4}</Text>
                </View>
                </View>

          </View>
        </View>
      </View>
    </View>
  );
}