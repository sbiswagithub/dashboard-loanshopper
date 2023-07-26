import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FAIcons from "react-native-vector-icons/FontAwesome5";

import getStyles from "./../../../../styles/styles";
import * as colors from "./../../../../constants/colors";
import * as banners from "./../../../../constants/banners";
import * as prospects from "./../../../../constants/prospects";
import { loadBrokerProspects, loadBrokerProspectsCount, selectProspectsFilter  } from '../../../../actions';

class SearchViewModeScroller extends Component  {

	  constructor(props) {
      super(props);
    }

    reloadProspects(selection) {
        this.props.loadBrokerProspectsCount( 1, this.props.pagesize,selection, true, this.props.accessCode, this.props.loadBrokerProspects );  
    }

    render () {
      const s = getStyles();
      return (
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <View style={[s.chipsLayout, { paddingLeft:25, paddingRight:25, maxWidth:"400%", alignSelf:"center",}]}>
              <MaterialIcons.Button name="new-releases" size={20} borderRadius={30} 
                backgroundColor={this.props.prospectsFilter == prospects.RECENT ?  colors.LOGO_DARK_BLUE : colors.LOGO_BRIGHT_BLUE } 
                color={this.props.prospectsFilter == prospects.RECENT ?  colors.LOGO_BRIGHT_BLUE : colors.LOGO_DARK_BLUE} 
                style={{ borderWidth:0.5, borderColor:colors.LOGO_BRIGHT_BLUE}}
                iconStyle={{margin:3,alignContent:'center'}} 
                onPress={() => {this.reloadProspects(prospects.RECENT)}}
                >{banners.PROSPECTS_RE}</MaterialIcons.Button>
              <View style={{width:"5%"}}/>
              <MaterialCommunityIcons.Button name="home-search" size={20} borderRadius={30} 
                backgroundColor={this.props.prospectsFilter == prospects.FIRST_HOME ?  colors.LOGO_DARK_BLUE : colors.LOGO_BRIGHT_BLUE } 
                color={this.props.prospectsFilter == prospects.FIRST_HOME ?  colors.LOGO_BRIGHT_BLUE : colors.LOGO_DARK_BLUE} 
                style={{borderWidth:0.5, borderColor:colors.LOGO_BRIGHT_BLUE}}
                iconStyle={{margin:3,alignContent:'center'}} 
                onPress={() => {this.reloadProspects(prospects.FIRST_HOME)}}
                >{banners.PROSPECTS_FH}</MaterialCommunityIcons.Button>
              <View style={{width:"5%"}}/>
              <FAIcons.Button name="piggy-bank" size={20} borderRadius={30} 
                backgroundColor={this.props.prospectsFilter == prospects.INVESTOR ?  colors.LOGO_DARK_BLUE : colors.LOGO_BRIGHT_BLUE} 
                color={this.props.prospectsFilter == prospects.INVESTOR ?  colors.LOGO_BRIGHT_BLUE : colors.LOGO_DARK_BLUE} 
                style={{borderWidth:0.5, borderColor:colors.LOGO_BRIGHT_BLUE}}
                iconStyle={{margin:3,alignContent:'center'}} 
                onPress={() => {this.reloadProspects(prospects.INVESTOR)}}
                >{banners.PROSPECTS_INV}</FAIcons.Button>
              <View style={{width:"5%"}}/>
              <MaterialIcons.Button name="autorenew" size={20} borderRadius={30} 
                backgroundColor={this.props.prospectsFilter == prospects.REFINANCE ?  colors.LOGO_DARK_BLUE : colors.LOGO_BRIGHT_BLUE} 
                color={this.props.prospectsFilter == prospects.REFINANCE ?  colors.LOGO_BRIGHT_BLUE : colors.LOGO_DARK_BLUE} 
                style={{borderWidth:0.5, borderColor:colors.LOGO_BRIGHT_BLUE}}
                iconStyle={{margin:3,alignContent:'center'}} 
                onPress={() => {this.reloadProspects(prospects.REFINANCE)}}
                >{banners.PROSPECTS_REF}</MaterialIcons.Button>
              <View style={{width:"5%"}}/>
              <MaterialCommunityIcons.Button name="camera-timer" size={20} borderRadius={30} 
                backgroundColor={this.props.prospectsFilter == prospects.URGENT ?  colors.LOGO_DARK_BLUE : colors.LOGO_BRIGHT_BLUE} 
                color={this.props.prospectsFilter == prospects.URGENT ?  colors.LOGO_BRIGHT_BLUE : colors.LOGO_DARK_BLUE} 
                style={{borderWidth:0.5, borderColor:colors.LOGO_BRIGHT_BLUE}}
                iconStyle={{margin:3,alignContent:'center'}} 
                onPress={() => {this.reloadProspects(prospects.URGENT)}}
                >{banners.PROSPECTS_URG}</MaterialCommunityIcons.Button>
              <View style={{width:"5%"}}/>
              <Fontisto.Button name="wallet" size={20} borderRadius={30} 
                backgroundColor={this.props.prospectsFilter == prospects.SELFEMP ?  colors.LOGO_DARK_BLUE : colors.LOGO_BRIGHT_BLUE} 
                color={this.props.prospectsFilter == prospects.SELFEMP ?  colors.LOGO_BRIGHT_BLUE : colors.LOGO_DARK_BLUE} 
                style={{borderWidth:0.5, borderColor:colors.LOGO_BRIGHT_BLUE}}
                iconStyle={{margin:3,alignContent:'center'}} 
                onPress={() => {this.reloadProspects(prospects.SELFEMP)}}
                >{banners.PROSPECTS_SE}</Fontisto.Button>
              <View style={{width:"5%"}}/>
              <MaterialIcons.Button name="all-inclusive" size={20} borderRadius={30} 
                backgroundColor={this.props.prospectsFilter == prospects.ALL || this.props.prospectsFilter == null ?  colors.LOGO_DARK_BLUE : colors.LOGO_BRIGHT_BLUE} 
                color={this.props.prospectsFilter == prospects.ALL || this.props.prospectsFilter == null ?  colors.LOGO_BRIGHT_BLUE : colors.LOGO_DARK_BLUE} 
                style={{borderWidth:0.5, borderColor:colors.LOGO_BRIGHT_BLUE}}
                iconStyle={{margin:3,alignContent:'center'}} 
                onPress={() => {this.reloadProspects(prospects.ALL)}}
                >{banners.PROSPECTS_ALL}</MaterialIcons.Button>
            </View>
            </ScrollView>
      );
  }
}


const mapStateToProps = ({ authReducer, prospectReducer }) => {

  const { showTrialAccountMessage, prospectTiles, page, pagesize, hasMore, prospectsFilter, updated } = prospectReducer;
  const { accessCode, appEntryMode } = authReducer;
  return { accessCode, appEntryMode, showTrialAccountMessage, prospectTiles, page, pagesize, hasMore, prospectsFilter, updated };
};

export default connect(mapStateToProps, { loadBrokerProspects, loadBrokerProspectsCount, selectProspectsFilter })(SearchViewModeScroller);
