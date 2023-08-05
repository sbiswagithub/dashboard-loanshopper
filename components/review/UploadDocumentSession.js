import React, { Component, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { View } from "react-native";
import { connect, useDispatch } from 'react-redux';
import { Paragraph, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import FileUploadButton from '../common/FileUploadButton'
import SpinnerHolder from '../common/SpinnerHolder'

import getStyleSheet from '../../styles/styles';  
import { handleFetchError, closeUploadDocument, getDocumentUploadSession, addDocumentSession , 
	setDocumentUploadResult, fetchStoredDocuments, setProposalDocuments } from '../../actions';
import {  } from '../../constants/banners';
import { LOGO_DARK_BLUE, WHITE, LOGO_BRIGHT_BLUE, BLACK, TRANSPARENT } from "../../constants/colors";
import ErrorDialog from "../ErrorDialog";

const UploadPortal = (props) => {
	const styles = getStyleSheet();
	const [ready, setReady] = useState(false)
	const [global, setGlobal] = useState(true)
	const [add, setAdd] = useState(false)
	const [page,setPage] = useState(1)
	const [session, setSession] = useState()

	return (
		<>
		<Portal>
			<Dialog visible={props.showConfirmUploadToS3} onDismiss={props.closeUploadDocument} style={{maxWidth:'50%', alignSelf:"center"}}  >
			<Dialog.Title  style={styles.textMediumBoldLogoPaleBlue}>Select file to upload</Dialog.Title>
			<Dialog.Content>
				{page == 1 ? 
				<View>
				<Paragraph style={styles.textMediumLogoDarkBlue}>Add required document - {props?.selectedDocumentTypeForUpload?.item?.description} </Paragraph>
				<View style={[{flexDirection:'row', width:'100%', marginTop:'5%', alignSelf:"center", justifyContent:"space-between",}]}>
					<FAIcon name={'star'} size={20} 
						color={LOGO_DARK_BLUE} backgroundColor={TRANSPARENT} iconStyle={{alignContent:'center', }}  
						></FAIcon>
					<Paragraph style={[styles.textMediumSmallLogoDarkBlue,{marginLeft:'5%'}]}>Hint - Upload one file at a time. Repeat To upload multiple files, and select 'Add' on the next screen</Paragraph>
				</View> 
				</View> 
				: null}
				{page == 2 ? 
				<View style={[{flexDirection:'column',  width:'100%', alignSelf:"stretch", justifyContent:"space-between"}]}>
					<View style={[{flexDirection:'row', width:'100%', marginTop:'5%', alignSelf:"center", justifyContent:"space-between",}]}>
						<Paragraph style={[styles.textMediumLogoDarkBlue]}>
				{add ? 'Add' : 'Replace'}</Paragraph>
						<FAIcon name={add ?  'files-o' : 'file'} size={40} 
							color={LOGO_DARK_BLUE} backgroundColor={TRANSPARENT} iconStyle={{alignContent:'center', }}  
							onPress={() => {
								setAdd(!add)
							}}
							></FAIcon>
					</View>
					<View style={[{flexDirection:'row', width:'100%', marginTop:'5%', alignSelf:"center", justifyContent:"space-between",}]}>
						<Paragraph style={styles.textMediumLogoDarkBlue}>{
							global ? 'Shared' : 'Exclusive'
						}</Paragraph>
						<FAIcon name={global ?  'users' : 'user-circle'} size={40} 
							color={LOGO_DARK_BLUE} backgroundColor={TRANSPARENT} iconStyle={{alignContent:'center', }} 
							onPress={() => {
								setGlobal(!global)
							}}
							></FAIcon>
					</View>
					<View style={[{flexDirection:'row', width:'100%', marginTop:'5%', alignSelf:"center", justifyContent:"space-between",}]}>
						<FAIcon name={'star'} size={20} 
							color={LOGO_DARK_BLUE} backgroundColor={TRANSPARENT} iconStyle={{alignContent:'center', }}  
							></FAIcon>
						<Paragraph style={[styles.textMediumSmallLogoDarkBlue,{marginLeft:'5%'}]}>Hint - 'Replace' will remove previous documents of this type. 'Exclusive' will mean only this broker can access this document</Paragraph>
					</View> 
				</View>	: null}
				{page == 3 ? 
				<View style={[{flexDirection:'column',  width:'100%', alignSelf:"stretch", justifyContent:"space-between"}]}>
					<View style={[{flexDirection:'column', width:'100%', marginTop:'5%', alignSelf:"center", justifyContent:"space-between",}]}>
						<FileUploadButton {...session}  onComplete={props.setDocumentUploadResult}  />
					</View>
				</View> : null}
			</Dialog.Content>

			<Dialog.Actions>
				<View style={[{flexDirection:'row', margin:'2%', width:'100%', alignSelf:"stretch", justifyContent:"space-between"}]}>
					<Icon.Button name="close" size={15} borderRadius={30}
						color={LOGO_BRIGHT_BLUE} backgroundColor={BLACK}
						iconStyle={{margin:5,alignContent:'center'}} 
						onPress={() => {
							props.closeUploadDocument()
							setSession(undefined)
							setPage(1)
							setReady(false)
							setAdd(false)
							setGlobal(false)
						}} >{'Close'}</Icon.Button>
					
					{ready ? 
					null : 
					<Icon.Button name="arrow-right" size={15} borderRadius={30}
						color={LOGO_DARK_BLUE} backgroundColor={WHITE}
						iconStyle={{margin:5,alignContent:'center'}} 
						onPress={async () => {
							setPage(page+1)
							if (page == 2)		
								trackPromise(props.getDocumentUploadSession(
									global ? 'global' : 'exclusive', 
									props?.selectedDocumentTypeForUpload?.item?._id, 
									(session) => {
										//console.log(session)
										setReady(true)
										setSession({...session, brokerId: props?.displayProposal?.agent?._id, overwrite : !add})
										props.addDocumentSession(session)
									}, 
									props.handleFetchError));

							}} >{'Next'}</Icon.Button>					
					}
				</View>	
			</Dialog.Actions>
			</Dialog>
		</Portal>		
		</>
	);
}


class UploadDocumentSession extends Component {

	constructor(props) {
        super(props);
    }
    

    render () {

		const styles = getStyleSheet();
		const session = this.props.documentUploadSessions.find( s => s.documentTypeId === this.props?.selectedDocumentTypeForUpload?.item?._id)
    	return (
			<View  elevation={10} style={[styles.viewStyle]}>
				{this.props?.documentUploadResult === undefined ? 
				<UploadPortal {...this.props} />
				: this.props?.documentUploadResult?.success == true ?
				<Portal>
					<Dialog visible={this.props.showConfirmUploadToS3 && session != undefined} onDismiss={this.props.closeUploadDocument} style={{maxWidth:'50%', alignSelf:"center"}}  >
					<Dialog.Title  style={styles.textLargeLogoDarkBlue}>Upload successful</Dialog.Title>
					<Dialog.Content>
						<Paragraph>File {this.props?.documentUploadResult?.filename} uploaded.</Paragraph>
						<Paragraph>Occasionally, it may take a few minutes for the document to show up</Paragraph>
						</Dialog.Content>
					<Dialog.Actions>
						<Icon.Button name="close" size={15} borderRadius={30}
							color={LOGO_BRIGHT_BLUE} backgroundColor={BLACK}
							iconStyle={{margin:5,alignContent:'center'}} 
							onPress={() => {
								trackPromise(this.props.fetchStoredDocuments(this.props.setProposalDocuments))
								this.props.closeUploadDocument()
							}} >{'Close'}</Icon.Button>
					</Dialog.Actions>
					</Dialog>
				</Portal> 
				: this.props?.documentUploadResult?.success == false ?
				<Portal>
					<Dialog visible={this.props.showConfirmUploadToS3 && session != undefined} onDismiss={this.props.closeUploadDocument} style={{maxWidth:'50%', alignSelf:"center"}}  >
					<Dialog.Title style={styles.textLargeBoldPurple}>Upload failed</Dialog.Title>
					<Dialog.Content><Paragraph>File upload error. Please try again in a short while and if problem persists, contact support.</Paragraph></Dialog.Content>
					<Dialog.Actions>
						<Icon.Button name="close" 
							size={15} borderRadius={30}
							color={LOGO_BRIGHT_BLUE} backgroundColor={BLACK}
							iconStyle={{margin:5,alignContent:'center'}} 
							onPress={this.props.closeUploadDocument} >{'Close'}</Icon.Button>
					</Dialog.Actions>
					</Dialog>
				</Portal> : null				
				
				}
				<SpinnerHolder />
				<ErrorDialog />
			</View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalReducer, proposalCalendarReducer }) => {
  const { error } = authReducer;
  const { displayProposal } = proposalCalendarReducer;
  const { showConfirmUploadToS3, documentUploadSessions, selectedDocumentTypeForUpload, documentUploadResult } = proposalReducer;
  return { error, showConfirmUploadToS3, documentUploadSessions, selectedDocumentTypeForUpload,documentUploadResult, displayProposal };
};

export default connect(mapStateToProps, { handleFetchError, closeUploadDocument, getDocumentUploadSession, 
	addDocumentSession, setDocumentUploadResult, fetchStoredDocuments, setProposalDocuments })(UploadDocumentSession);