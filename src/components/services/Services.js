import React, { Component } from "react";
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import getStyleSheet from '../../styles/styles';  
import {  } from '../../actions';
import { OTHER_SERVICES } from '../../constants/banners';
import {  } from '../../constants/documents';
import Purchases from './Purchases';

class Services extends Component {
    constructor(props) {
	    super(props);
	}

    render () {
    	const styles = getStyleSheet();

    	return (
    	<View  style={[ {backgroundColor: '#ffffff'}]}>
        	 <LinearGradient
		        colors={['#ffffff','#c7edf3']} style={styles.background}
		        start={{x:0,y:1}} end={{x:0,y:0}} />
				<View style={{flexDirection:'column',height:"92%", marginLeft:10}}>
					<View style={styles.space}></View>
					<Text style={styles.textMediumBoldGray} >{OTHER_SERVICES}</Text>
					<View style={styles.homeBoxColumn}>
						<View style={styles.homeBoxRow}>
							<View style={styles.homeBoxPanel}>
								<Purchases/>
							</View>
						</View>
					</View>
				</View>
		    </View>    	
        )
    }
}

const mapStateToProps = ({ documentsReducer }) => {
  const { mode } = documentsReducer  ;
  return { mode };
};

export default connect(mapStateToProps, { })(Services);