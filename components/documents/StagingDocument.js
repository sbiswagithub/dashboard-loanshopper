import React, { Component } from "react";
import { View, ScrollView, } from 'react-native';
import { Chip, IconButton, Button, Paragraph, Dialog, Portal, RadioButton, Subheading, TextInput, List, Card, Title , Avatar  } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { reloadStagingDocuments, setStagingDocument, selectStoredDocumentType } from '../../actions';
import { FILENAME, DOC_TYPE, ID_DOC, BANK_ST_DOC, INC_PROOF_DOC, OTHER_DOC, } from '../../constants/banners';
import { ID_DOC_TYPE, BANK_STMT_TYPE, INC_PROOF_TYPE, OTHER_DOC_TYPE } from '../../constants/documents';
import { LOGO_BRIGHT_BLUE, } from '../../constants/colors';

import ErrorDialog from '../ErrorDialog';
import SpinnerHolder from '../common/SpinnerHolder';

const onUpdateDocumentType = (props, documentId, documentType) => {
	props.updateDocumentTypeAction(
		{...props, documentId: documentId, documentType: documentType },
		() => {
			props.fetchStagingDocumentsAction(props.otp, props, props.reloadStagingDocuments);
			}
		);
}
class StagingDocument extends Component {
    constructor(props) {
		super(props);
	}

	render () {
		const styles = getStyleSheet();
		const document = this.props.stagingDocumentInView;
		const file = document?.filename?.length > 28 ? 
				document.filename.substring(1,25) + "..." : 
				document.filename;
    	return (
			<View>
				<ScrollView horizontal={true} style={styles.stagingFile} showsHorizontalScrollIndicator={false} >
					<Card style={styles.fileNameCard}>
						<Card.Content >
							<Subheading style={styles.textSmallBoldGray}>{FILENAME}</Subheading>
							<Subheading style={styles.textSmallBoldLogoDarkBlue}>{file}</Subheading>
							<View style={styles.space}/>
						</Card.Content>
					</Card>
					<Card style={styles.fileTypesCard}>
						<Card.Content >
							<Subheading style={styles.textSmallBoldGray}>{DOC_TYPE}</Subheading>
							<View style={styles.space}/>
							<Chip selected={document?.metadata?.documentType == ID_DOC_TYPE} 
								onPress={() => { onUpdateDocumentType(this.props, document._id, ID_DOC_TYPE); }}
								icon={(props) => 
									<Avatar.Icon {...props} size={25} color={"#ffffff"} 
										style={{backgroundColor:LOGO_BRIGHT_BLUE}} icon="folder" />}  >{ID_DOC}</Chip>
							<View style={styles.space}/>
							<Chip selected={document?.metadata?.documentType == BANK_STMT_TYPE } 
								onPress={() => { onUpdateDocumentType(this.props, document._id, BANK_STMT_TYPE); }}
								icon={(props) => 
									<Avatar.Icon {...props} size={25} color={"#ffffff"} 
										style={{backgroundColor:LOGO_BRIGHT_BLUE}} icon="folder" />} >{BANK_ST_DOC}</Chip>
							<View style={styles.space}/>
							<Chip selected={document?.metadata?.documentType == INC_PROOF_TYPE } 
								onPress={() => { onUpdateDocumentType(this.props, document._id, INC_PROOF_TYPE); }}
								icon={(props) => 
									<Avatar.Icon {...props} size={25} color={"#ffffff"} 
										style={{backgroundColor:LOGO_BRIGHT_BLUE}} icon="folder" />} >{INC_PROOF_DOC}</Chip>
							<View style={styles.space}/>
							<Chip selected={document?.metadata?.documentType == OTHER_DOC_TYPE } 
								onPress={() => { onUpdateDocumentType(this.props, document._id, OTHER_DOC_TYPE ); }}
								icon={(props) => 
									<Avatar.Icon {...props} size={25} color={"#ffffff"} 
										style={{backgroundColor:LOGO_BRIGHT_BLUE}} icon="folder" />} >{OTHER_DOC}</Chip>
							<View style={styles.space}/>
							<View style={styles.space}/>
						</Card.Content>
					</Card>
					<View style={{margin:75}}/>
				</ScrollView>

				<SpinnerHolder />

			</View>
        )
    }
}

const mapStateToProps = ({ authReducer, documentsReducer }) => {
  const { otp, stagingDocumentInView, updateDocumentTypeAction, fetchStagingDocumentsAction } = documentsReducer   ;
  const { accessCode, } = authReducer;
  return { accessCode, otp, stagingDocumentInView, updateDocumentTypeAction, fetchStagingDocumentsAction };
};

export default connect(mapStateToProps, { reloadStagingDocuments, setStagingDocument, selectStoredDocumentType })(StagingDocument);