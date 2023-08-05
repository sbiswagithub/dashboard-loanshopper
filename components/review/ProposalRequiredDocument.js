import React, { Component, useState } from "react";
import { View, Text, ScrollView, } from 'react-native';
import { Dialog, Portal, Paragraph } from "react-native-paper";
import { connect } from 'react-redux';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';

import getStyleSheet from '../../styles/styles';  
import {  } from '../../constants/banners';
import { handleFetchError, setDocumentTypeToUpload, showSelectUploadDocumentModal,  } from '../../actions';
import SpinnerHolder from '../common/SpinnerHolder';
import ErrorDialog from '../ErrorDialog';
import ProposalDocumentThumbnail from './ProposalDocumentThumbnail';
import { LOGO_BRIGHT_BLUE, BACKGROUND_LIGHT_GRAY, LOGO_DARK_BLUE, TRANSPARENT, WHITE, BLACK } from '../../constants/colors';


class ProposalRequiredDocument extends Component {

	constructor(props) {
		super(props);
		this.state = {show : false}
	}

    render () {
		const isSelectedDocument = this.props.requiredDocument.item._id === this.props?.selectedDocumentTypeForUpload?.item?._id 
		const styles = getStyleSheet();
		const proposalDocuments = this.props.proposalDocuments === undefined ? [] : this.props.proposalDocuments.filter(document => document.metadata.documentTypeId == this.props.requiredDocument.item._id);
    	return (
		<View key={this.props.requiredDocument.item._id} style={[{flexDirection:"row", flexGrow:1,alignSelf:"stretch" }]}>
			<View style={{flexDirection:"column", flexGrow:1}}>
				<View  style={[{flexDirection:"row", alignItems:"stretch", justifyContent:"space-between", }]}>
					<View  style={[{flexDirection:"column", flexGrow:1, paddingRight:'1%'}]}>
						<Text style={[styles.textSmallBoldLogoDarkBlue, {paddingLeft:'1%'}]}>{this.props.requiredDocument.item.description}</Text>
					</View>
					<View  style={[{flexDirection:"column",alignSelf:"flex-end"}]}>
						{proposalDocuments.length > 0 ? 
						<Icon.Button name="link" size={20} borderRadius={25}
										backgroundColor={LOGO_DARK_BLUE} iconStyle={{margin:1}} 
										onPress={()=> {this.setState({show:true})}}
										></Icon.Button> 
						: 
						<Icon.Button name="clouduploado" size={20} borderRadius={25}
							backgroundColor={WHITE} color={LOGO_DARK_BLUE} 
							onPress={()=>{
								if (isSelectedDocument)
									this.props.setDocumentTypeToUpload(undefined)
								else {
									this.props.setDocumentTypeToUpload(this.props.requiredDocument)
									this.props.showSelectUploadDocumentModal()
								}
							}} >{'Upload'}</Icon.Button>}
					</View>
				</View>

				<View style={styles.hr}/>
			</View>			

			<SpinnerHolder />
			<ErrorDialog />
			<Portal>
				<Dialog 
					style={{width:'50%', alignSelf:"center"}} 
					visible={this.state.show} onDismiss={() => this.setState({show : false})}  >
				<Dialog.Title style={styles.textLargeBlue}>{this.props.requiredDocument.item.description}</Dialog.Title>
				<Dialog.Content>
						{proposalDocuments.length > 1 ? 
						<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
							{proposalDocuments.map((document) => {
								return (<ProposalDocumentThumbnail item={document} />)
							})}
						</ScrollView> : 
						<>{proposalDocuments.map((document) => {
							return (<ProposalDocumentThumbnail item={document} />)
						})}</>						
					}
				</Dialog.Content>
				<Dialog.Actions>
					<View style={{flexDirection:"row", alignSelf:"stretch", alignItems:"stretch", justifyContent:"space-between"}}>
						<Icon.Button name="clouduploado" size={20} borderRadius={25}
							backgroundColor={LOGO_BRIGHT_BLUE} color={LOGO_DARK_BLUE} 
							onPress={()=>{
								this.setState({show:false})
								if (isSelectedDocument)
									this.props.setDocumentTypeToUpload(undefined)
								else {
									this.props.setDocumentTypeToUpload(this.props.requiredDocument)
									this.props.showSelectUploadDocumentModal()
								}
							}} >{'Upload'}</Icon.Button>
						<Icon.Button name="close" size={15} borderRadius={30}
							color={LOGO_BRIGHT_BLUE} backgroundColor={BLACK}
							iconStyle={{margin:5,alignContent:'center'}} 
							onPress={() => {this.setState({show:false})}} >{'Close'}</Icon.Button>	
					</View>
				</Dialog.Actions>
				</Dialog>
			</Portal>

		</View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer,  }) => {
  const { selectedDocumentTypeForUpload, proposalDocuments } = proposalReducer;
  const { displayProposal } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { accessCode, borrower, displayProposal, selectedDocumentTypeForUpload, proposalDocuments };
};

export default connect(mapStateToProps, { handleFetchError, setDocumentTypeToUpload, showSelectUploadDocumentModal })(ProposalRequiredDocument);