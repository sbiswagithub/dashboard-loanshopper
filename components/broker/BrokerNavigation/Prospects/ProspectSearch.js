import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Paragraph, Dialog, Portal, } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useNavigation } from '@react-navigation/native';

import * as colors from "./../../../../constants/colors";
import * as banners from "./../../../../constants/banners";
import SearchViewModeSroller from './SearchViewModeSroller';
import SearchResultsScroller from './SearchResultsScroller';
import { clearTrialAccountMessage_2, loadBrokerProspects, closeBrokerProspects, loadBrokerProspectsCount  } from '../../../../actions';
import getStyleSheet from '../../../../styles/styles';  
import SpinnerHolder from '../../../common/SpinnerHolder';
import { TouchableOpacity } from "react-native-gesture-handler";

function CloseButton(props) {
	const navigation = useNavigation();
  return (
      <MaterialCommunityIcons
        name="close-box"
        size={40}
        color={"#000000"}
        style={{marginLeft:"5%", marginTop:"10%"}}
        onPress={() => {
          navigation.navigate("BrokerHome");
          props.closeAction();
        }}
        />
  );
}

class ProspectSearch extends Component {

	  constructor(props) {
      super(props);
    }


    componentDidMount() {
      if (this.props.hasMore || this.props.page == 1) {
        this.props.loadBrokerProspectsCount( this.props.page, this.props.pagesize,this.props.prospectsFilter, false, this.props.accessCode, this.props.loadBrokerProspects );  
      }
    }    
    
    render () {
      const styles = getStyleSheet();
      return (
	    	<View style={styles.container}>
        	  <LinearGradient
              colors={[colors.BACKGROUND_LIGHT_BLUE, colors.LOGO_BRIGHT_BLUE]} style={styles.background}
              start={{x:0,y:0.33}} end={{x:0,y:0}} />

            <View style={{flexDirection:'column',maxHeight:"100%",padding:"2%", paddingBottom:0}}>
              <View style={{flexDirection:'column',maxHeight:"90%"}}>
                <Text style={[styles.textLargeBoldLogoDarkBlue, {marginTop:"10%",}]} >{banners.BROWSE_PROSPECTS}</Text>

                <View style={{height:"10%", }}>
                <SearchViewModeSroller {...this.props} />
                </View>
                <View style={[{maxHeight: "80%", }]}>
                  <SearchResultsScroller  />
                </View>
              </View>
              <View style={{flexDirection:'column',height:"10%", marginTop:"5%"}}>
                <View style={{flex:1, flexDirection:"row",   alignSelf:"flex-end", maxWidth:"70%"}}>
                  <CloseButton closeAction={this.props.closeBrokerProspects} />
                </View>
              </View>
            </View>

            <Portal>
              <Dialog visible={this.props.showTrialAccountMessage} >
              <Dialog.Title>{banners.BROKER_INTRO_3}</Dialog.Title>
              <Dialog.Content><Paragraph>{banners.BROKER_INTRO_4}</Paragraph></Dialog.Content>
              <Dialog.Actions>
                <Button onPress={()=> {this.props.clearTrialAccountMessage_2()}}>{banners.CLOSE_BUTTON_BANNER}</Button>
              </Dialog.Actions>
              </Dialog>
            </Portal>      

						<SpinnerHolder/>
		    </View> 
        );
    }
}

const mapStateToProps = ({ authReducer, prospectReducer }) => {

  const { showTrialAccountMessage, prospectTiles, page, pagesize, hasMore, prospectsFilter, updated } = prospectReducer;
  const { accessCode, appEntryMode } = authReducer;
  return { accessCode, appEntryMode, showTrialAccountMessage, prospectTiles, page, pagesize, hasMore, prospectsFilter, updated };
};

export default connect(mapStateToProps, { clearTrialAccountMessage_2, loadBrokerProspects, closeBrokerProspects, loadBrokerProspectsCount })(ProspectSearch);