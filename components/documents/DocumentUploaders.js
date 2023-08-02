import React, { Component } from "react";
import { View, } from 'react-native';
import { Portal,  } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { toEmailMode, toGoogleDriveMode, toDropboxMode, hideDocumentUploaderModal } from '../../actions';
import { } from '../../constants/banners';
import { CHOOSE_UPLOADER_MODE, EMAIL_MODE, EMAIL_MODE_2, DROPBOX_MODE, GOOGLE_DRIVE_MODE, EMAIL_MODE_3, EMAIL_MODE_4 } from '../../constants/documents';
import {  } from '../../constants/colors';
import ErrorDialog from '../ErrorDialog';
import SpinnerHolder from '../common/SpinnerHolder';
import EmailUploader from "./EmailUploader";

  
class DocumentUploaders extends Component {
    constructor(props) {
	    super(props);
	}

    render () {
    	const styles = getStyleSheet();

    	return (
		<View style={{flexDirection:'column', height:"100%"}}>
			<Portal>
				{this.props.mode == CHOOSE_UPLOADER_MODE  
					|| this.props.mode == EMAIL_MODE || this.props.mode == EMAIL_MODE_2 
					|| this.props.mode == EMAIL_MODE_3 || this.props.mode == EMAIL_MODE_4 ? 
					<EmailUploader/> :
					this.props.mode == DROPBOX_MODE ? null :
					this.props.mode == GOOGLE_DRIVE_MODE ? null : null   }
			</Portal>

			<SpinnerHolder />  	
		</View>
        )
    }
}

const mapStateToProps = ({ documentsReducer }) => {
  const { mode } = documentsReducer   ;
  return { mode };
};

export default connect(mapStateToProps, { toEmailMode, toGoogleDriveMode, toDropboxMode, hideDocumentUploaderModal })(DocumentUploaders);