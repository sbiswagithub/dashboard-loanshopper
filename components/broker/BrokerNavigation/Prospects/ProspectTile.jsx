import { StyleSheet, Image, View, Text, ScrollView } from "react-native";

import getStyles from "./../../../../styles/styles";

import * as colors from "./../../../../constants/colors";
import * as banners from "./../../../../constants/banners";
import { numberToCurrency } from '../../../../actions';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";

const s = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderWidth:1,
    borderRadius: 20,
  },
  blurContainer: {
    flex: 1,
    borderRadius: 20,
  },
  blurtext :{
    color:colors.BACKGROUND_LIGHT_BLUE, 
    opacity:0.4, 
    shadowOpacity: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 5,
    elevation: 5,
    backgroundColor : "#000000",
    borderWidth: 0.5,
    borderRadius:5,
  }
});

export default function ProspectTile({
  name,
  lending,
  age,
  location,
  postCode,
  profession,
  profile,
  liked,
  read,
  onShowProspect=() => {},
  onToggleLike=() => {},
  onClickSendProposal=() => {},
}) {
  const styles = getStyles();
  const heartStatus = liked ? "heart" : "heart-outline";
  return (
    <View style={[{borderRadius: 20, height:300, maxWidth:"95%", padding:"2%", backgroundColor:"#ffffff"}]}>

        <View style={[{flex:1, padding:"2%"}]}>
        <View style={[{flex:1, flexDirection:"row", justifyContent:"space-between", }]}>
        <Text style={[styles.textMediumBoldWhite, s.blurtext, {maxWidth:"80%"} ]}>{name}</Text>
        {
          read? null :
          <Entypo
            name="unread"
            size={20}
            color={colors.LOGO_BRIGHT_BLUE} />
        }
        </View>
        <View style={[styles.hr,]} />
        <View style={[styles.space]} />
        <View style={[{flex:1, flexDirection:"row", justifyContent:"space-between" }]}>
          <Text style={[styles.textSmallBoldLogoDarkBlue, ]}>{banners.LENDING}</Text>
          <Text style={[styles.textSmallBoldLogoDarkBlue, ]}>{numberToCurrency(lending)}</Text>
        </View>
        <View style={[{flex:1, flexDirection:"row", justifyContent:"space-between" }]}>
          <Text style={[styles.textSmallBoldLogoDarkBlue, ]}>{banners.LOCATION}</Text>
          <Text style={[styles.textSmallBoldLogoDarkBlue, ]}>{location}</Text>
        </View>
        <View style={[{flex:1, flexDirection:"row", justifyContent:"space-between" }]}>
          <Text style={[styles.textSmallBoldLogoDarkBlue, ]}>{banners.POSTCODE}</Text>
          <Text style={[styles.textSmallBoldLogoDarkBlue, ]}>{postCode}</Text>
        </View>
        <View style={[{flex:1, flexDirection:"row",  justifyContent:"space-between" }]}>
          <Text style={[styles.textSmallBoldLogoDarkBlue, ]}>{banners.AGE}</Text>
          <Text style={[styles.textSmallBoldLogoDarkBlue, s.blurtext, ]}>{age}</Text>
        </View>
        <View style={[{flex:1, flexDirection:"row",  justifyContent:"space-between" }]}>
          <Text style={[styles.textSmallBoldLogoDarkBlue, ]}>{banners.PROFESSION}</Text>
          <Text style={[styles.textSmallBoldLogoDarkBlue, s.blurtext, {maxWidth:"45%"}]}>{profession}</Text>
        </View>
        <View style={[styles.hr,]} />
        <View style={[{flex:1, flexDirection:"row", marginRight:"5%", justifyContent:"space-between" }]}>
         <MaterialCommunityIcons
          name="account-details"
          size={40}
          color={colors.LOGO_DARK_BLUE}
          onPress={onShowProspect}
          />
         <MaterialCommunityIcons
          name={heartStatus}
          size={40}
          color={colors.LOGO_DARK_BLUE}
          onPress={onToggleLike}
          />
        </View>
        </View>
        <View style={[styles.space]} />
    </View>
   );
}
