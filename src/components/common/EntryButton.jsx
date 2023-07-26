import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import getStyles from "./../../styles/styles";

import * as colors from "./../../constants/colors";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FAIcons from "react-native-vector-icons/FontAwesome5";

export default function EntryButton({
  children,
  count,
  icon,
  onPressNavigate,
  onPressImage = () => {},
  onPressText = () => {},
  onPress = () => {},
}) {
  const s = getStyles();
	const navigation = useNavigation();

  //size = height + padding + border
  const size = 55;

  const getIcon = (iconSet = "ionicons", name) => {
    if (iconSet.toLowerCase() === "materialcommunityicons") {
      return (
        <MaterialCommunityIcons
          name={name}
          size={size / 1.6}
          color={colors.LOGO_BRIGHT_BLUE}
        />
      );
    } else if (iconSet.toLowerCase() === "ionicons") {
      return (
        <Ionicons
          name={name}
          size={size / 1.6}
          color={colors.LOGO_BRIGHT_BLUE}
        />
      );
    } else if (iconSet.toLowerCase() === "faicons") {
      return (
        <FAIcons
          name={name}
          size={size / 1.6}
          color={colors.LOGO_BRIGHT_BLUE}
        />
      );
    } else {
      return <Text>??</Text>;
    }
  };

  return (
    <TouchableOpacity onPress={() => {navigation.navigate(onPressNavigate)}}>
    <View
      style={[
        s.flexRow,
        s.w80p,
        s.p2,
        s.bR500,
        s.bBrightBlue,
        s.bw3,
        s.m4,
        s.bgLightGray,
      ]}
    >
      <View
        style={[
          s.p2,
          s.bR50,
          s.centerItems,
          { height: size, width: size },
          s.bgWhite,
        ]}
      >
        {icon && getIcon(icon.set, icon.name)}
      </View>
      <View style={[s.p2, { flex: 1 }, s.justifyCenter]}>
        <Text style={[s.textBrightBlue, s.fwHigh, s.textMediumLarge]}>
          {children}
        </Text>
      </View>
      {count > 0 ? 
      <View style={[s.centerItems]}>
        <View style={[s.centerItems, s.bR50, s.bgBrightBlue, s.p1, s.px2]}>
          <Text style={[s.textWhite]}>{count}</Text>
        </View>
      </View>
      : null }
    </View></TouchableOpacity>
  );
}
