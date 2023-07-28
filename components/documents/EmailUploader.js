import React, { Component } from "react";
import { Keyboard, View, } from 'react-native';
import { IconButton, TextInput , Dialog, Subheading,  } from 'react-native-paper';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import getStyleSheet from '../../styles/styles';  
import { setFilesUploadOtp, switchDocumentUploaderMode, hideDocumentUploaderModal, toQueryString, handleFetchError, showStagingDocuments } from '../../actions';
import { CHOOSE_UPLOADER_MODE, EMAIL_MODE, EMAIL_MODE_2, EMAIL_MODE_3, EMAIL_MODE_4  } from '../../constants/documents';
import { NEXT, EMAIL_DOCUMENTS_TEXT_1, EMAIL_DOCUMENTS_TEXT_2, EMAIL_DOCUMENTS_TEXT_3, PASSCODE_INPUT_LABEL, PASSCODE_INPUT_DEFAULT, REVIEW_AND_SAVE } from '../../constants/banners';
import { LOGO_BRIGHT_BLUE, } from '../../constants/colors';

import StagingDocuments from './StagingDocuments'; 

class EmailUploader extends Component {
    constructor(props) {
	    super(props);
	}

	getDocumentsForOtp(input) {
		if (input.length === 5) {
			// Hide keyboard to stop further user input
			if (!Constants.platform.web) Keyboard.dismiss();

			this.props.setFilesUploadOtp(input);
			this.props.fetchStagingDocumentsAction(input, this.props, this.props.showStagingDocuments);
		}
	}

    render () {
		const styles = getStyleSheet();
		const prev = 
			this.props.mode == EMAIL_MODE_4 ? EMAIL_MODE_3 :
			this.props.mode == EMAIL_MODE_3 ? EMAIL_MODE_2 :
			this.props.mode == EMAIL_MODE_2 ? CHOOSE_UPLOADER_MODE : null;
    	return (
			<Dialog 
				visible={this.props.mode == CHOOSE_UPLOADER_MODE 
					|| this.props.mode == EMAIL_MODE_2 
					|| this.props.mode == EMAIL_MODE_3 
					|| this.props.mode == EMAIL_MODE_4} 
				style={this.props.mode == CHOOSE_UPLOADER_MODE  ? styles.uploaderSmallPanel :
					this.props.mode == EMAIL_MODE_2  ? styles.uploaderSmallPanel :  
					this.props.mode == EMAIL_MODE_3  ? styles.uploaderSmallPanel :
					this.props.mode == EMAIL_MODE_4  ? styles.uploaderLargePanel :
					null } >
				<Dialog.Content>
					<View>
						<View style={styles.uploaderTopButtons}>
							{this.props.mode == CHOOSE_UPLOADER_MODE ? <View/> : 
							<IconButton icon="arrow-left-circle" color={"grey"} size={30} 
								onPress={() => {this.props.switchDocumentUploaderMode(prev);}} />
								}
							<IconButton icon="arrow-collapse-all" color={"grey"} size={30} 
								onPress={this.props.hideDocumentUploaderModal} />
						</View>
						<View>
							{ this.props.mode == CHOOSE_UPLOADER_MODE ? 
								<View>
									<Subheading style={styles.textLargeLogoDarkBlue}>{EMAIL_DOCUMENTS_TEXT_1 }</Subheading>
									<View style={styles.space}/>
									<Icon.Button name={"arrow-right-circle"} size={25} borderRadius={10}
											backgroundColor={LOGO_BRIGHT_BLUE } 
											color={"#ffffff"} 
											style={{borderWidth:0.5, borderColor:LOGO_BRIGHT_BLUE, }}
											iconStyle={{margin:8,alignContent:'center'}} 
											onPress={() => {this.props.switchDocumentUploaderMode(EMAIL_MODE_2);}}
											>{NEXT}</Icon.Button>
								</View> :
								
								this.props.mode == EMAIL_MODE_2 ? 
									<View>
										<TextInput label={PASSCODE_INPUT_LABEL} defaultValue={PASSCODE_INPUT_DEFAULT} 
											clearTextOnFocus={true} 
											onChangeText={(text) => {
												this.getDocumentsForOtp(text, this.props);
												}}  />
										<View style={styles.space}></View>
										<Subheading style={styles.textLargeLogoDarkBlue}>{EMAIL_DOCUMENTS_TEXT_2}</Subheading>
										<View style={styles.space}></View>
									</View> :

								this.props.mode == EMAIL_MODE_3 ? 
								<View style={styles.stackedSimpleLayout}>
									{ this.props.stagingDocuments == null || this.props.stagingDocuments.length == 0 ? 
										<Subheading style={styles.textLargeLogoDarkBlue}>{EMAIL_DOCUMENTS_TEXT_3 }</Subheading> : 
										<View>	
										<Subheading style={styles.textLargeLogoDarkBlue}>{REVIEW_AND_SAVE}</Subheading>
										<View style={styles.space}/>
										<Icon.Button name={"arrow-right-circle"} size={25} borderRadius={10}
												backgroundColor={LOGO_BRIGHT_BLUE} 
												color={"#ffffff"} 
												style={{borderWidth:0.5, borderColor:LOGO_BRIGHT_BLUE, }}
												iconStyle={{margin:8,alignContent:'center'}} 
												onPress={() => {this.props.switchDocumentUploaderMode(EMAIL_MODE_4);}}
												>{NEXT}</Icon.Button>
										</View>
									 }
								</View> : 
								this.props.mode == EMAIL_MODE_4 ? <StagingDocuments /> : null }
						</View>
					</View>
				</Dialog.Content>
			</Dialog>
        );
    }
}

const mapStateToProps = ({ authReducer, documentsReducer }) => {
  const { mode, stagingDocuments, fetchStagingDocumentsAction, updatedDocument } = documentsReducer   ;
  const { accessCode } = authReducer   ;
  return { mode, accessCode, stagingDocuments, fetchStagingDocumentsAction, updatedDocument };
};

export default connect(mapStateToProps, { switchDocumentUploaderMode, hideDocumentUploaderModal, toQueryString, handleFetchError, showStagingDocuments, setFilesUploadOtp })(EmailUploader);