import React, { Component } from "react";
import { Text, View, Image, ScrollView, } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import getStyleSheet from '../../styles/styles';  
import { FILE_DISCLAIMER_TEXT, UPLOAD_FILE  } from '../../constants/banners';
import { showDocumentUploaderModal, toDefaultDocumentUploaderMode } from '../../actions';
import { CHOOSE_UPLOADER_MODE } from "../../constants/documents";
import { LOGO_BRIGHT_BLUE } from "../../constants/colors";
import {  } from "react-native-paper";


class DocumentButtons extends Component {

	constructor(props) {
        super(props);
    }

    render () {
    	const styles = getStyleSheet();
    	return (
			<View style={{marginLeft:5}}>
				<Text style={styles.textSmallBoldLogoDarkBlue}>{FILE_DISCLAIMER_TEXT}</Text>
				<View style={styles.space}/>
				<Icon.Button name={"addfile"} size={30} borderRadius={30}
		    		backgroundColor={LOGO_BRIGHT_BLUE} color={"#ffffff"} 
					iconStyle={{margin:8,alignContent:'center'}} 
		    		onPress={() => {this.props.showDocumentUploaderModal(CHOOSE_UPLOADER_MODE)}} >{UPLOAD_FILE}</Icon.Button>
		    </View >
        )
    }
}

const mapStateToProps = ({ authReducer, documentsReducer }) => {
  const { accessCode, borrower } = authReducer;
  const { mode } = documentsReducer;
  return { mode, accessCode, borrower };
};

export default connect(mapStateToProps, { toDefaultDocumentUploaderMode, showDocumentUploaderModal })(DocumentButtons);