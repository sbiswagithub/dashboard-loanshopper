import React, { Component } from "react";
import { Text, View, Image, ScrollView, } from 'react-native';
import { IconButton, Dialog, Subheading, } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import getStyleSheet from '../../styles/styles';  
import { toEmailMode, toGoogleDriveMode, toDropboxMode, hideDocumentUploaderModal } from '../../actions';
import { ADD_DOCUMENTS_START, } from '../../constants/banners';
import { CHOOSE_UPLOADER_MODE, EMAIL_MODE, DROPBOX_MODE, GOOGLE_DRIVE_MODE } from '../../constants/documents';
import { LOGO_BRIGHT_BLUE } from '../../constants/colors';

const renderUploadOptionButton = (props) => {
	const styles = getStyleSheet();
    return (
      <Icon.Button name={props.iconName} size={40} borderRadius={20}
		    		backgroundColor={props.active ? LOGO_BRIGHT_BLUE : "#ffffff"} 
					color={props.active ? "#ffffff" : LOGO_BRIGHT_BLUE} 
					style={{borderWidth:0.5, borderColor:LOGO_BRIGHT_BLUE}}
		    		iconStyle={{margin:8,alignContent:'center'}} 
		    		onPress={() => {props.onPress()}} />
    );
  };
  
class ChooseUploaderView extends Component {
    constructor(props) {
	    super(props);
	}

    render () {
    	const styles = getStyleSheet();

    	return (
			<Dialog visible={this.props.mode == CHOOSE_UPLOADER_MODE} style={styles.uploaderSmallPanel} >
				<IconButton style={{alignSelf:"flex-end"}} icon="arrow-collapse-all" color={'grey'} size={30} onPress={this.props.hideDocumentUploaderModal} />
				<Dialog.Content style={{height:"65%"}}>
					<View style={{ width:"93%", alignSelf:"center"}}>
						<View>
							<Subheading style={styles.textLargeLogoDarkBlue}>{ ADD_DOCUMENTS_START }</Subheading>
							<View style={styles.space} />
							<View style={styles.space} />
						</View>	 
						<View style={styles.tableRow}>
							<View>
								{renderUploadOptionButton(
									{iconName:"mail", 
									active: this.props.mode == EMAIL_MODE,
									onPress: this.props.toEmailMode
									})} 		
							</View>
							<View style={[styles.space]}/>
							<View>
								{renderUploadOptionButton(
									{iconName:"dropbox", 
									active: this.props.mode == DROPBOX_MODE,
									onPress: this.props.toDropboxMode
									})} 		
							</View>
							<View style={[styles.space]}/>
							<View>
								{renderUploadOptionButton(
									{iconName:"google", 
									active: this.props.mode == GOOGLE_DRIVE_MODE,
									onPress: this.props.toGoogleDriveMode
									})}
							</View>
						</View>
					</View>
				</Dialog.Content>
			</Dialog>
        )
    }
}

const mapStateToProps = ({ documentsReducer }) => {
  const { mode } = documentsReducer   ;
  return { mode };
};

export default connect(mapStateToProps, { toEmailMode, toGoogleDriveMode, toDropboxMode, hideDocumentUploaderModal })(ChooseUploaderView);