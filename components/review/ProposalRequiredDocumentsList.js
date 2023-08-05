import React, { Component } from "react";
import { View, Text, FlatList, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Card, } from 'react-native-paper';

import getStyleSheet from '../../styles/styles';  
import { } from '../../constants/banners';
import { addDocumentSession, showSelectUploadDocumentModal, setDocumentTypeToUpload, uploadToS3, handleFetchError, } from '../../actions';
import ProposalRequiredDocument from './ProposalRequiredDocument';
import UploadDocumentSession from './UploadDocumentSession';
import SpinnerHolder from '../common/SpinnerHolder';
import { LOGO_BRIGHT_BLUE, BACKGROUND_LIGHT_GRAY, LOGO_DARK_BLUE, TRANSPARENT, WHITE } from '../../constants/colors';

const renderRequiredDocument = (item) => {
	return (
		<View key={new Date().getMilliseconds() + item._id} style={{flexDirection:"row", alignSelf:"stretch"}}>
			<ProposalRequiredDocument requiredDocument={item} />
		</View>
	);
}

const renderRequiredDocumentGroup = (displayProposal, groupType, groupLabel) => {
	const styles = getStyleSheet();
	return (
		<View style={{alignSelf:"stretch",}}>
			<Text style={[styles.textSmallBoldPurple]} >{groupLabel}</Text>
			<View style={styles.space}/>
			<FlatList
				data={displayProposal.requiredDocs.filter(d => d.type === groupType)}
				renderItem={renderRequiredDocument}
				keyExtractor={(item) => item._id}
				keyboardShouldPersistTaps='handled' 
				showsVerticalScrollIndicator={false} 
			/>

		</View>
	);
}

class ProposalRequiredDocumentsList extends Component {

	constructor(props) {
        super(props);
	}

	render () {
		const styles = getStyleSheet();
    	return (
			<View  style={[{flexDirection:"row",  flexGrow: 1}]}>
				<View style={{maxHeight:'75%', width:'100%'}}>
					<Text style={styles.textMediumBoldGray}>Required documents</Text>
					<ScrollView  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'  >
						{ this.props.displayProposal?.requiredDocs != null && this.props.displayProposal?.requiredDocs.length > 0 ? 
						<Card style={{backgroundColor:{TRANSPARENT}, width:'100%', alignSelf:"stretch"}}>
							<Card.Content>
								<View style={{alignSelf:"stretch"}}>
								{
									this.props.displayProposal.requiredDocs.find(d => d.type === 'id_proof') !== undefined ?
									renderRequiredDocumentGroup(this.props.displayProposal, 'id_proof', 'Identity documents') : null
								}
								<View style={styles.space}/>
								<View style={styles.space}/>
								{
									this.props.displayProposal.requiredDocs.find(d => d.type === 'inc_proof') !== undefined ?
									renderRequiredDocumentGroup(this.props.displayProposal, 'inc_proof', 'Income and liability documents') : null
								}
								<View style={styles.space}/>
								<View style={styles.space}/>
								{
									this.props.displayProposal.requiredDocs.find(d => d.type === 'bank_statement') !== undefined ?
									renderRequiredDocumentGroup(this.props.displayProposal, 'bank_statement', 'Bank Statements') : null
								}
								<View style={styles.space}/>
								<View style={styles.space}/>
								{
									this.props.displayProposal.requiredDocs.find(d => d.type === 'other_docs') !== undefined ?
									renderRequiredDocumentGroup(this.props.displayProposal, 'other_docs', 'Other relevant documents') : null
								}									
								</View>
							</Card.Content>
						</Card>
						: null }
					</ScrollView>
				</View>
				<UploadDocumentSession s3Mode={true} />
				<SpinnerHolder /> 
			</View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer, loanProductReducer }) => {
  const { documentUploadSessions, showDocumentsUpload, selectedDocumentTypeForUpload } = proposalReducer;
  const { } = loanProductReducer;
  const { displayProposal } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { accessCode, borrower, displayProposal, showDocumentsUpload, selectedDocumentTypeForUpload, documentUploadSessions };
};

export default connect(mapStateToProps, { showSelectUploadDocumentModal, setDocumentTypeToUpload, 
	uploadToS3, handleFetchError, addDocumentSession })(ProposalRequiredDocumentsList);