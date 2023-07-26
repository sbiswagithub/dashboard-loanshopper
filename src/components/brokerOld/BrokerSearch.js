import React, { Component } from "react";
import { Text, View, Image, SafeAreaView,  } from 'react-native';
import { ToggleButton, Chip, List, IconButton, Badge,   } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { toggleBrokerSearchPanel, closeBrokerSearch } from '../../actions';
import { BROKER_SEARCH_BANNER, SEARCH_BY_LOC_BANNER } from '../../constants/banners';
import { SEARCH_BY_LOCATION_TOGGLE, SEARCH_ADVANCED_TOGGLE,TOGL_1_SIZE, TOGL_2_SIZE } from '../../constants/brokerSearch';

import LocationSearch from './LocationSearch';
import SlideOutButton from '../menu/SlideOutButton';
import AdvancedSearch from './AdvancedSearch';

class BrokerSearch extends Component {

	constructor(props) {
        super(props);
    }

    render () {
		const styles = getStyleSheet();
		return (
        <SafeAreaView  style={styles.container}>
		    	<View style={[styles.brokerSearchBox]}>
		    	<View style={styles.brokerSearchRow}>
		    		<View style={[styles.stackedLayout]}>
			    		<View style={styles.brokerSearchPanel}>
					    	<View style={styles.brokerSearchPanelHeader}>
				    			<Image source={require('../../assets/lens.png')}  style={styles.homeBoxPanelHeaderIcon} />
						    	<Text style={styles.textMediumBoldGray}>{BROKER_SEARCH_BANNER}</Text>
					    	</View>
				    		<View style={styles.hr} />

			    			<View style={styles.smallSpace} />
					    	<View style={styles.stackedLayout}>
						    	<View style={styles.justifiedLayout}>
									<ToggleButton.Row  onValueChange={(value) => this.props.toggleBrokerSearchPanel(value)} value={this.props.searchMode} >
						    	      <ToggleButton icon="apple-safari" value={SEARCH_BY_LOCATION_TOGGLE} size={TOGL_1_SIZE} style={{marginRight:5}} />
						    	      <ToggleButton icon="account-search-outline" value={SEARCH_ADVANCED_TOGGLE} size={TOGL_2_SIZE} style={{marginRight:5}} />
						    	    </ToggleButton.Row>
						    	      {this.props.searchMode === SEARCH_BY_LOCATION_TOGGLE ? 
												<Chip icon="apple-safari" >{SEARCH_BY_LOC_BANNER}</Chip> :
												<Chip icon="account-search-outline" >{'Advanced Search'}</Chip> }
					    		</View>

				    			<View style={styles.space} />
				    	        { this.props.searchMode === SEARCH_BY_LOCATION_TOGGLE ? <LocationSearch /> : <AdvancedSearch/> }
				    		</View>
						</View>
					</View>
				</View >
		        </View>
				<View style={[styles.rightAligned]}>
				<SlideOutButton />
	   		    </View>
	    </SafeAreaView>
        )
    }
}

const mapStateToProps = ({ brokerSearchReducer }) => {
  const { searchMode } = brokerSearchReducer ;
  return { searchMode };
};

export default connect(mapStateToProps, { toggleBrokerSearchPanel, closeBrokerSearch })(BrokerSearch);