import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import getStyleSheet from '../../../../styles/styles';  

import * as colors from "./../../../../constants/colors";
import * as banners from "./../../../../constants/banners";
import ProspectTile from './ProspectTile';
import { toggleLikeProspect, showMoreProspects, loadBrokerProspectsCount, loadBrokerProspects } from "./../../../../actions";
import { TouchableOpacity } from "react-native-gesture-handler";


const styles = getStyleSheet();

const renderTiles = (pair, props) => {
	return (
		<View>
      <View style={styles.tableRow}>
        <View style={[styles.tableColumn50pct,  ]}>    		
        <ProspectTile 
          name={pair[0].name} 
          lending={pair[0].lending} 
          location={pair[0].location} 
          postCode={pair[0].postCode} 
          age={pair[0].age} 
          profile={pair[0].profile} 
          profession={pair[0].profession}
          liked={pair[0].liked}
          read={pair[0].read}
          onToggleLike={() => {props.toggleLikeProspect(pair[0].id)}}
          />
        </View>
        {pair.length >1 ?
        <View style={[styles.tableColumn50pct,  ]}>    		
        <ProspectTile 
          name={pair[1].name}  
          lending={pair[1].lending} 
          location={pair[1].location} 
          postCode={pair[1].postCode} 
          age={pair[1].age} 
          profile={pair[1].profile} 
          profession={pair[1].profession}
          liked={pair[1].liked}
          read={pair[1].read}
          onToggleLike={() => {props.toggleLikeProspect(pair[1].id)}}          
          />
        </View>
        : <View style={[styles.tableColumn50pct,  ]}></View>}
      </View>
      <View style={styles.space}></View> 
    </View>
	);
}

function convertToTiles(prospects) {
  const clone = [...prospects];
  const set = [];

  while (clone.length > 0) {
    const pairs = clone.splice(0,2);
    set.push(pairs);
  }
  
  return set ;
}

class SearchResultsScroller extends Component {

	  constructor(props) {
      super(props);
    }

    loadMoreProspects() {
        this.props.loadBrokerProspectsCount( this.props.page +1, this.props.pagesize,this.props.prospectsFilter, false, this.props.accessCode, this.props.loadBrokerProspects );  

    }

    render () {
      const tiles = convertToTiles(this.props.prospectTiles);
      return (
				<ScrollView showsVerticalScrollIndicator={false} >
        <View style={[]}>
          <View style={styles.space}></View>

          {
          tiles.length > 0 ?
          tiles.map(pair => (renderTiles(pair, this.props))) :
            <Text style={[styles.textMediumBoldLogoDarkBlue]}>{banners.PROSPECTS_EMPTY}</Text>
          } 

          {this.props.hasMore ? 
          <>
            <View style={styles.tableRow}>
              <View style={[styles.tableColumn100pct ]}>
                <TouchableOpacity onPress={() => {this.loadMoreProspects()}} style={{maxWidth:"90%", alignSelf:"stretch"}} >    		
                <MaterialIcons.Button name="more" size={30} borderRadius={35} 
                  backgroundColor={colors.LOGO_DARK_BLUE} 
                  color={'#FFFFFF'} 
                  style={{ borderWidth:0.5, borderColor:colors.LOGO_BRIGHT_BLUE,}}
                  iconStyle={{margin:3}} 
                  >{banners.PROSPECTS_SHOW_MORE}</MaterialIcons.Button></TouchableOpacity>
              </View>
            </View>
          </> : null
          }
        </View>
        </ScrollView>
      );
     }
}


const mapStateToProps = ({ authReducer, brokerReducer, prospectReducer }) => {

  const { prospectTiles, page, pagesize, hasMore, prospectsFilter } = prospectReducer;
  const {  } = brokerReducer;
  const { accessCode, appEntryMode } = authReducer;
  return { accessCode, appEntryMode, prospectTiles, page, pagesize, hasMore, prospectsFilter };
};

export default connect(mapStateToProps, { toggleLikeProspect, showMoreProspects, loadBrokerProspectsCount, loadBrokerProspects })(SearchResultsScroller);