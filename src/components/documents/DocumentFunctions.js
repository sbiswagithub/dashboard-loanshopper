import React, { Component } from "react";
import { Text, View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import {  } from '../../actions';
import { STORED_DOCUMENTS, UPLOAD_DOCUMENTS } from '../../constants/banners';
import { DIALOG_CLOSED_MODE, STAGING_DOCUMENTS_MODE, DEFAULT_MODE, } from '../../constants/documents';
import {  } from '../../constants/colors';

import StoredDocuments2 from './StoredDocuments2';
import DocumentUploaders from './DocumentUploaders';
import StagingDocuments from "./StagingDocuments";

class DocumentFunctions extends Component {
    constructor(props) {
	    super(props);
	}

    render () {
    	const styles = getStyleSheet();

    	return (
			
		<View style={[styles.stackedLayout, {width:"90%"}]}>
			<View>
				<View style={styles.space}></View>
				<View style={styles.space}></View>
				<Text style={styles.textMediumBoldGray} >
					{this.props.mode == STAGING_DOCUMENTS_MODE ? UPLOAD_DOCUMENTS : STORED_DOCUMENTS}</Text>
						<View style={styles.homeBoxPanel}>
						{  (this.props.mode == STAGING_DOCUMENTS_MODE) ? <StagingDocuments/> : 
								(this.props.mode == DEFAULT_MODE || this.props.mode == DIALOG_CLOSED_MODE) ? 
									<StoredDocuments2/> : null }
						</View>
			</View>
			{  (this.props.mode == DIALOG_CLOSED_MODE) ? null : <DocumentUploaders/> }
		</View>
        )
    }
}

const mapStateToProps = ({ documentsReducer }) => {
  const { mode, documentsMode } = documentsReducer  ;
  return { mode, documentsMode };
};

export default connect(mapStateToProps, {  })(DocumentFunctions);