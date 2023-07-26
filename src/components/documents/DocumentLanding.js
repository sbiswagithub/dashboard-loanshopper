import React, { Component } from "react";
import { View,  } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {  } from "react-native-paper";

import getStyleSheet from '../../styles/styles';  
import {  } from '../../actions';
import { } from '../../constants/banners';
import {  } from '../../constants/documents';
import { BACKGROUND_LIGHT_BLUE } from '../../constants/colors';
import DocumentFunctions from "./DocumentFunctions";


class DocumentLanding extends Component {
    constructor(props) {
	    super(props);
	}

    render () {
    	const styles = getStyleSheet();

    	return (
    	<View style={styles.container}>
        	 <LinearGradient
		        colors={["#ffffff",BACKGROUND_LIGHT_BLUE]} style={styles.background}
		        start={{x:0,y:1}} end={{x:0,y:0}} />
		    	<DocumentFunctions/>
		    </View>    	
        )
    }
}

const mapStateToProps = ({ documentsReducer }) => {
  const { mode } = documentsReducer  ;
  return { mode };
};

export default connect(mapStateToProps, { })(DocumentLanding);