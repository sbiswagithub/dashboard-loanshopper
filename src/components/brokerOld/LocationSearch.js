import React, { Component } from "react";
import { Text, View, } from 'react-native';
import { List, IconButton, Badge  } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { PO_BOX_BANNER, } from '../../constants/banners';
import PostCodeSelect from './PostCodeSelect';

class LocationSearch extends Component {
    constructor(props) {
	    super(props);
	}

    render () {
    	const styles = getStyleSheet();

    	return (
    	<View style={[styles.searchBoxBlue]}>
			<View style={styles.smallSpace} />
			<View>
				<View style={styles.smallSpace} />
				<View style={[styles.justifiedLayout]}>
			    	<Text style={styles.textMediumBoldGray}>{PO_BOX_BANNER}</Text>
			    	<PostCodeSelect />
				</View>
    			<View style={styles.hr} />
	    		<View style={styles.justifiedLayout}>
	    			<IconButton color='#d8d3cd' icon="format-list-bulleted" size={25} />
	    			<IconButton icon="map-search" size={25} />
	    			<IconButton color='#d8d3cd' icon="chevron-left-circle-outline" size={25} />
	    			<Badge size={30} style={{backgroundColor:'#f4f4f4', alignSelf: 'center'}}>1</Badge>
	    			<Badge size={30} style={{backgroundColor:'#ede59a', alignSelf: 'center'}}>2</Badge>
	    			<IconButton icon="chevron-right-circle-outline" size={25} />
    			</View>
		    	<View style={styles.searchResultsBlue}>
			    	<View style={{width:300}}>
		    			<List.Section>
			    		    <List.Item titleNumberOfLines={2} descriptionNumberOfLines={3}
		    					titleStyle={styles.textMediumBoldPurple}
    							descriptionStyle={styles.textSmallGray}
			    		    	title="V-Corp" 
			    		    	description="Investments for life
		    		    			Suite 45, 304 Mowbray Road, Lane Cove 2067
		    		    			0429880044" 
		    		    			right={props => <List.Icon {...props} icon="magnify-plus-outline" />}
		    		    			/>
			    			<View style={styles.hr} />
			    		    <List.Item titleNumberOfLines={2} descriptionNumberOfLines={3}
		    					titleStyle={styles.textMediumBoldPurple}
    							descriptionStyle={styles.textSmallGray}
			    				title="Approved Holdings Pty Ltd" 
			    		    	description="Investments for life
		    		    			Suite 45, 304 Mowbray Road, Lane Cove 2067
		    		    			0429880044" 
		    		    			right={props => <List.Icon {...props} icon="magnify-plus-outline" />}
		    		    			/>

		    		    	<View style={styles.hr} />
			    		    <List.Item titleNumberOfLines={2} descriptionNumberOfLines={3}
		    					titleStyle={styles.textMediumBoldPurple}
    							descriptionStyle={styles.textSmallGray}
			    				title="Aussie Chatswood " 
			    		    	description="Investments for life
		    		    			Suite 45, 304 Mowbray Road, Lane Cove 2067
		    		    			0429880044" 
		    		    			right={props => <List.Icon {...props} icon="magnify-plus-outline" />}
		    		    			/>
		    			    			<View style={styles.hr} />
		    			    		    <List.Item titleNumberOfLines={2} descriptionNumberOfLines={3}
		    		    					titleStyle={styles.textMediumBoldPurple}
		        							descriptionStyle={styles.textSmallGray}
		    			    				title="Aussie Lane Cove" 
		    			    		    	description="Investments for life
		    		    		    			Suite 45, 304 Mowbray Road, Lane Cove 2067
		    		    		    			0429880044" 
		    		    		    			right={props => <List.Icon {...props} icon="magnify-plus-outline" />}
		    		    		    			/>

    					</List.Section>
		    		</View>
	    		</View>
    		</View>
		</View>
        )
    }
}

const mapStateToProps = ({ homeReducer, disclosureReducer }) => {
  const {  } = homeReducer;
  const {  } = disclosureReducer;
  return {  };
};

export default connect(mapStateToProps, {  })(LocationSearch);