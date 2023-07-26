import { View, Text, TouchableWithoutFeedback } from "react-native";

import getStyles from "./../../styles/styles";

import * as colors from "./../../constants/colors";

export default function Button({
  bgColor = colors.LOGO_DARK_BLUE,
  color = "white",
  disableColor = "#ccc",
  onPress,
  children,
  style = [],
  loading = false,
  disable = false,
}) {
  const s = getStyles();

  const btnContainerStyle = [
    s.p2,
    s.centerItems,
    s.bR5,
    { backgroundColor: bgColor },
  ];

  if (Array.isArray(style)) {
    style.forEach((e) => btnContainerStyle.push(e));
  } else {
    btnContainerStyle.push(style);
  }

  const LoadingGif = () => {
    return <Text style={[{ color: color }]}>(Loading)</Text>;
  };

  if (disable) {
    return (
      <TouchableWithoutFeedback>
        <View style={btnContainerStyle}>
          <Text style={[{ color: disableColor }]}>{children}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={btnContainerStyle}>
        <Text style={[{ color: color }]}>{children}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
