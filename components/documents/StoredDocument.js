import React, { Component } from "react";
import { Keyboard, Dimensions, View, Text, Alert, ScrollView,  } from 'react-native';
import { IconButton, Subheading, List, Card, } from 'react-native-paper';
import { connect } from 'react-redux';
import * as Linking from 'expo-linking';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import getStyleSheet from '../../styles/styles';  
import { formatBytes, toQueryString, handleFetchError, selectStoredDocumentType } from '../../actions';
import { RECEIVED_DATE, EXPIRES_DATE, FILE_SIZE, FILENAME, SHARING, SHARING_ALL, SHARING_BROKERS } from '../../constants/banners';
import { } from '../../constants/documents';
import { BLACK, LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, WHITE, BACKGROUND_LIGHT_BLUE } from '../../constants/colors';
import { API_DOCUMENTS_URI, } from '../../constants/apiUrls';

import ErrorDialog from '../ErrorDialog';
import SpinnerHolder from '../common/SpinnerHolder';


class StoredDocument extends Component {
    constructor(props) {
	    super(props);
	}

	render () {
		const styles = getStyleSheet();
		return (
			<View>
				<ScrollView horizontal={true} style={{ margin:10, }} showsHorizontalScrollIndicator={false} >
					<View style={styles.stackedLayout} >
					<Icon name="export" 
						size={50} 
						color={LOGO_BRIGHT_BLUE}
						style={{borderColor:LOGO_BRIGHT_BLUE}}
						iconStyle={{margin:3,alignContent:'center'}} 
						onPress={ ()=>{ 
							const uri = `${API_DOCUMENTS_URI}/`+ this.props.item._id + 
									toQueryString({ 'Authorization': this.props.accessCode, 'operationId' : 'loadDocument' });
							//console.log(uri)
							Linking.canOpenURL(uri).then(supported => {
								if (supported) {
									Linking.openURL(uri);
								} else {
									////console.log("Unable to open URI: " + uri);
								}
								});
						}} 
						/>
							<View style={styles.space}/>
							<View style={styles.space}/>
					<Icon name="delete-alert" 
						size={50} 
						color={LOGO_DARK_BLUE}
						style={{borderColor:LOGO_DARK_BLUE}}
						iconStyle={{margin:3,alignContent:'center'}} 
						onPress={() => 
							{
							this.props.deleteDocumentAction(
								{...this.props, _id: this.props.item._id},
								() => {
									this.props.fetchStoredDocumentsAction(this.props, 
										(storedDocuments) => {
											this.props.selectStoredDocumentType(this.props.documentType, storedDocuments);
										} );
									}
								);
							}} 
						/>
					</View>

					<Card style={styles.fileDetailsCard }>
						<Card.Content >
							<Subheading style={styles.textSmallBoldGray}>{FILENAME}</Subheading>
							<Subheading style={styles.textSmallBoldLogoDarkBlue}>{this.props.item.filename}</Subheading>
							<View style={styles.space}/>
						</Card.Content>
					</Card>
					<Card style={styles.fileDetailsCard }>
						<Card.Content>
							<Subheading style={styles.textSmallBoldGray}>{RECEIVED_DATE}</Subheading>
							<Subheading style={styles.textSmallBoldLogoDarkBlue}>{Moment(this.props.item.receivedDate).format('DD MMM YYYY')}</Subheading>
							<View style={styles.space}/>
							<Subheading style={styles.textSmallBoldGray}>{FILE_SIZE}</Subheading>
							<Subheading style={styles.textSmallBoldLogoDarkBlue}>{formatBytes(this.props.item.length)}</Subheading>
							<View style={styles.space}/>
							<Subheading style={styles.textSmallBoldGray}>{EXPIRES_DATE}</Subheading>
							<Subheading style={styles.textSmallBoldLogoDarkBlue}>{Moment(this.props.item.receivedDate).add(3, 'M').format('DD MMM YYYY')}</Subheading>
							<View style={styles.space}/>
						</Card.Content>
					</Card>
				</ScrollView>
					
				<SpinnerHolder />

			</View>
        )
    }
}

const mapStateToProps = ({ documentsReducer, authReducer }) => {
  const { mode, documentType, storedDocuments, fetchStoredDocumentsAction, deleteDocumentAction } = documentsReducer   ;
  const { accessCode } = authReducer;
  return { mode, documentType, storedDocuments, accessCode, fetchStoredDocumentsAction, deleteDocumentAction };
};

export default connect(mapStateToProps, { toQueryString, handleFetchError, selectStoredDocumentType })(StoredDocument);