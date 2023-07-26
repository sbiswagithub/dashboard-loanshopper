import React, { Component } from "react";
import { Keyboard, Dimensions, View, Text, Alert, ScrollView, TouchableWithoutFeedback, } from 'react-native';
import { Switch, IconButton, Button, Paragraph, Dialog, Portal, RadioButton, Subheading, TextInput, } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import getStyleSheet from '../../styles/styles';  
import { toEmailMode, toGoogleDriveMode, toDropboxMode, hideDocumentUploaderModal } from '../../actions';
import { ADD_DOCUMENTS , ADD_DOCUMENTS_START, EMAIL_DOCUMENTS_TEXT, EMAIL_DOCUMENTS_TEXT_1, EMAIL_DOCUMENTS_TEXT_2, DROPBOX_DOCUMENTS_TEXT, GOOGLE_DOCUMENTS_TEXT  } from '../../constants/banners';
import { DIALOG_CLOSED_MODE, CHOOSE_UPLOADER_MODE, EMAIL_MODE, DROPBOX_MODE, GOOGLE_DRIVE_MODE } from '../../constants/documents';
import { LOGO_BRIGHT_BLUE } from '../../constants/colors';
import ErrorDialog from '../ErrorDialog';
import SpinnerHolder from '../common/SpinnerHolder';
import EmailUploader from "./EmailUploader";

const renderIconButton = (props) => {
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
  
class GDriveUploader extends Component {
    constructor(props) {
	    super(props);
	}

    render () {
    	const styles = getStyleSheet();

    	return (
		<View style={{flexDirection:'column', height:"100%"}}>
			<Portal>
				<Dialog 
					visible={this.props.mode == CHOOSE_UPLOADER_MODE || this.props.mode == EMAIL_MODE || this.props.mode == DROPBOX_MODE || this.props.mode == GOOGLE_DRIVE_MODE} 
					style={this.props.mode == CHOOSE_UPLOADER_MODE ?  styles.uploaderSmallPanel : styles.uploaderPanel} >
					{this.props.mode == CHOOSE_UPLOADER_MODE ?  
					<IconButton style={{alignSelf:"flex-end"}} icon="arrow-collapse-all" color={"grey"} size={30} onPress={this.props.hideDocumentUploaderModal} />
					: 
					<View style={styles.chipsLayout}>
					<Dialog.Title style={styles.textMediumBoldGray}>{ADD_DOCUMENTS}</Dialog.Title>
					<IconButton style={{alignSelf:"flex-end"}} icon="arrow-collapse-all" color={"grey"} size={30} onPress={this.props.hideDocumentUploaderModal} />
					</View>
					 }
			      	<Dialog.Content style={{height:"65%"}}>
						<View style={{ width:"93%", alignSelf:"center"}}>
							{this.props.mode == CHOOSE_UPLOADER_MODE ? 
							<View>
								<Subheading style={styles.textLargeLogoDarkBlue}>{ ADD_DOCUMENTS_START }</Subheading>
								<View style={styles.space} />
								<View style={styles.space} />
							</View>	 : 
							null }
							<View style={styles.tableRow}>
								<View style={[styles.tableColumn20pct]}>
									{renderIconButton(
										{iconName:"mail", 
										active: this.props.mode == EMAIL_MODE,
										onPress: this.props.toEmailMode
										})} 		
								</View>
								<View style={[styles.space]}/>
								<View style={[styles.tableColumn20pct]}>
									{renderIconButton(
										{iconName:"dropbox", 
										active: this.props.mode == DROPBOX_MODE,
										onPress: this.props.toDropboxMode
										})} 		
								</View>
								<View style={[styles.space]}/>
								<View style={[styles.tableColumn20pct]}>
									{renderIconButton(
										{iconName:"google", 
										active: this.props.mode == GOOGLE_DRIVE_MODE,
										onPress: this.props.toGoogleDriveMode
										})}
								</View>
							</View>
							<View style={styles.space}></View>
							{ this.props.mode == EMAIL_MODE ? <EmailUploader/> : 
								this.props.mode == DROPBOX_MODE ? <Subheading style={styles.textMediumLogoDarkBlue}>{DROPBOX_DOCUMENTS_TEXT}</Subheading> :
								this.props.mode == GOOGLE_DRIVE_MODE ? <Subheading style={styles.textMediumLogoDarkBlue}>{GOOGLE_DOCUMENTS_TEXT}</Subheading> : 
								null }
					
						</View>
			      	</Dialog.Content>
			    </Dialog>
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

export default connect(mapStateToProps, { toEmailMode, toGoogleDriveMode, toDropboxMode, hideDocumentUploaderModal })(GDriveUploader);