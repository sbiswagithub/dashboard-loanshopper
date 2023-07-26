import React, { Component } from "react";
import { View, Text, TextInput } from 'react-native';
import { Slider } from 'react-native-elements';

import { connect } from 'react-redux';
import getStyleSheet from '../../styles/styles';

import { DEPENDANTS_BANNER, } from '../../constants/banners';
import { THUMB_COLOR } from '../../constants/common';
import { DEPENDANTS_SLIDER_MAX, DEPENDANTS_SLIDER_DEFAULT } from '../../constants/disclosure';
import { disclosureDependantsUpdated } from '../../actions';

class Dependants extends Component {

	constructor(props) {
        super(props);
	}

	whenUpdated(text) {
			this.props.disclosureDependantsUpdated(parseInt(text));
	}

	render () {
    	const styles = getStyleSheet();
    	return (
    		<View style={{ flex: 0.9, flexDirection:'column'}}>

				<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{DEPENDANTS_BANNER}</Text>
				<View style={styles.space}/>
			    
	   			<View style={styles.boxRow}>
		    		<View style={styles.boxCol60}>
			    		<Slider thumbStyle={styles.thumb} thumbTintColor={THUMB_COLOR}  
			    			maximumValue={DEPENDANTS_SLIDER_MAX} value={this.props.dependants} onValueChange={value => this.whenUpdated(value)}  />
			        </View>
		    		<View style={styles.boxCol40}>
						<Text 
						style={[styles.textSmallBoldBlue, {alignSelf:'flex-end', margin:5}]}>{this.props.dependants}</Text>
			        </View>
		        </View>
    		</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { dependants } = disclosureReducer;
  return { dependants };
};

export default connect(mapStateToProps, { disclosureDependantsUpdated })(Dependants);