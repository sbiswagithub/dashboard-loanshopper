import React, { Component } from "react";
import { Text, View, ScrollView } from 'react-native';
import { } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import getStyleSheet from '../../styles/styles';  
import { selectStoredDocumentType } from '../../actions';
import { NO_DOCUMENTS, ID_DOC, BANK_ST_DOC, INC_PROOF_DOC, OTHER_DOC, } from '../../constants/banners';
import { ID_DOC_TYPE, BANK_STMT_TYPE, INC_PROOF_TYPE, OTHER_DOC_TYPE, BANK_STATEMENTS_MODE, ID_DOCUMENTS_MODE, INC_PROOF_MODE, OTHER_DOCUMENTS_MODE } from '../../constants/documents';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE } from '../../constants/colors';

import DocumentList from "./DocumentList";
import DocumentButtons from './DocumentButtons';

const renderDocumentTypeButton = (props) => {
	const styles = getStyleSheet();
    return (
		<View>
      		<Icon.Button name={props.iconName} size={40} borderRadius={20}
					backgroundColor={props.active ? LOGO_BRIGHT_BLUE : "#ffffff"} 
					color={props.active ? LOGO_DARK_BLUE : 
							props.standBy ? LOGO_BRIGHT_BLUE : "grey" } 
					style={{borderWidth:0.5, borderColor:LOGO_BRIGHT_BLUE}}
		    		iconStyle={{margin:3,alignContent:'center'}} 
		    		onPress={() => {
						props.fetchStoredDocumentsAction( props, (storedDocuments) => {
								props.selectStoredDocumentType(props.documentType, storedDocuments);
							} );
						}} />
			<View style={styles.space} />
			<View style={styles.space} />
			<Text style={props.documentsMode == props.activeMode ? styles.textSmallBoldLogoDarkBlue : styles.textSmallGray}>{props.label}</Text>
		</View>
    );
};
  
class StoredDocuments2 extends Component {
    constructor(props) {
		super(props);
		console.log(props)
		props.fetchStoredDocumentsAction( props, (storedDocuments) => {
								props.selectStoredDocumentType(props.documentType, storedDocuments);
							} );
	}

    render () {
    	const styles = getStyleSheet();

    	return (
			<View style={{ height:"100%",}}>
				<ScrollView showsVerticalScrollIndicator={false}  keyboardShouldPersistTaps='handled'>
				<View style={{ height:"100%",}}>
					<View style={[styles.tableRow, { height:"100%"}]}>
						<View style={[styles.tableColumn30pct, { justifyContent: "space-evenly", }]}>
							{renderDocumentTypeButton(
								{
									...this.props,
									iconName:"card-account-details", 
									active: this.props.documentsMode == ID_DOCUMENTS_MODE,
									documentType: ID_DOC_TYPE,
									activeMode: ID_DOCUMENTS_MODE,
									standBy: this.props.hasIdDoc,
									label: ID_DOC,
									fetchStoredDocumentsAction: this.props.fetchStoredDocumentsAction,
								})}
							{renderDocumentTypeButton(
								{
									...this.props,
									iconName:"credit-card-clock", 
									active: this.props.documentsMode == BANK_STATEMENTS_MODE,
									documentType: BANK_STMT_TYPE,
									activeMode: BANK_STATEMENTS_MODE,
									standBy: this.props.hasBankStmtDoc,
									label: BANK_ST_DOC,
									fetchStoredDocumentsAction: this.props.fetchStoredDocumentsAction,
								})}
							{renderDocumentTypeButton(
								{
									...this.props,
									iconName:"cash-multiple", 
									active: this.props.documentsMode == INC_PROOF_MODE,
									documentType: INC_PROOF_TYPE,
									activeMode: INC_PROOF_MODE,
									standBy: this.props.hasIncProofDoc,
									label: INC_PROOF_DOC,
									fetchStoredDocumentsAction: this.props.fetchStoredDocumentsAction,
								})}
							{renderDocumentTypeButton(
								{
									...this.props,
									iconName:"file", 
									active: this.props.documentsMode == OTHER_DOCUMENTS_MODE,
									documentType: OTHER_DOC_TYPE,
									activeMode: OTHER_DOCUMENTS_MODE,
									standBy: this.props.hasOtherDoc,
									label: OTHER_DOC,
									fetchStoredDocumentsAction: this.props.fetchStoredDocumentsAction,
								})}
						</View>
						<View style={[styles.tableColumn70pct,  { alignItems: "stretch"}]}>
							{ this.props.storedDocuments != null && this.props.storedDocuments.length > 0 ? 
								<DocumentList />
								: 
								<Text style={[styles.textSmallBoldGray, {alignSelf:"flex-end"}]}>{NO_DOCUMENTS}</Text> 
								}
						</View>
					</View>
				</View>
				</ScrollView>
				<View style={styles.space} />
			</View>
        )
    }
}

const mapStateToProps = ({ authReducer, documentsReducer }) => {
  const { documentType, storedDocuments, documentsMode, hasIdDoc, hasBankStmtDoc, hasIncProofDoc, hasOtherDoc, fetchStoredDocumentsAction } = documentsReducer   ;
  const { accessCode } = authReducer;
  return { documentType, storedDocuments, documentsMode, accessCode, hasIdDoc, hasBankStmtDoc, hasIncProofDoc, hasOtherDoc, fetchStoredDocumentsAction };
};

export default connect(mapStateToProps, { selectStoredDocumentType })(StoredDocuments2);