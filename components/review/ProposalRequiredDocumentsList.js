import React, { Component } from "react";
import { View, Text, FlatList, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { Card, } from 'react-native-paper';

import getStyleSheet from '../../styles/styles';  
import { } from '../../constants/banners';
import { addDocumentSession, showSelectUploadDocumentModal, setDocumentTypeToUpload, uploadToS3, 
	handleFetchError, } from '../../actions';
import ProposalRequiredDocument from './ProposalRequiredDocument';
import UploadDocumentSession from './UploadDocumentSession';
import SpinnerHolder from '../common/SpinnerHolder';
import { LOGO_BRIGHT_BLUE, BACKGROUND_LIGHT_GRAY, LOGO_DARK_BLUE, TRANSPARENT, WHITE } from '../../constants/colors';

const renderRequiredDocument = (item) => {
	return (
		<ProposalRequiredDocument requiredDocument={item} />
	);
}

const renderRequiredDocumentGroup = (displayProposal, groupType, groupLabel) => {
	const styles = getStyleSheet();
	return (
		<View>
			<Text style={[styles.textSmallBoldPurple]} >{groupLabel}</Text>
			<View style={styles.space}/>
			<View style={styles.tableRow}>
				<View style={styles.tableColumn}>
					<FlatList
						data={displayProposal.requiredDocs.filter(d => d.type === groupType)}
						renderItem={renderRequiredDocument}
						keyExtractor={(item) => item._id}
						keyboardShouldPersistTaps='handled' 
						showsVerticalScrollIndicator={false} 
					/>
				</View>
			</View>

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
			<View  style={[{height:'100%', flexDirection:"row", justifyContent:"space-between"}]}>
				<View style={{maxHeight:'75%'}}>
					<Text style={styles.textMediumBoldGray}>Required documents</Text>
					<ScrollView  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' >
						{ this.props.displayProposal?.requiredDocs != null && this.props.displayProposal?.requiredDocs.length > 0 ? 
						<View>
						<Card style={{backgroundColor:{TRANSPARENT}}}>
							<Card.Content>
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
							</Card.Content>
						</Card>
						</View>
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