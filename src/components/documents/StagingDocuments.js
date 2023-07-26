import React, { Component } from "react";
import { Keyboard, Dimensions, View, Text, Alert, ScrollView, FlatList,  } from 'react-native';
import { Chip, IconButton, Button, Paragraph, Dialog, Portal, RadioButton, Subheading, TextInput, List, Card, Title , Avatar  } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import getStyleSheet from '../../styles/styles';  
import { storeStagingDocuments, deleteStagingDocument, setStagingDocument } from '../../actions';
import { NO_STAGING_DOCUMENTS, SAVE_BANNER, } from '../../constants/banners';
import {  } from '../../constants/documents';
import { LOGO_BRIGHT_BLUE, } from '../../constants/colors';

import StagingDocument from './StagingDocument';
import ErrorDialog from '../ErrorDialog';
import SpinnerHolder from '../common/SpinnerHolder';


const renderItem = ({ item, index, separators }, onDeleteAction ) => {
	const styles = getStyleSheet();
	const title = 'File ' + ++index;

	return (
		<View style={styles.tableRow}>
			<View style={styles.tableColumn80pct}>
			<List.Accordion id={title} title={title} 
				style={{borderRadius: 5, border:0.5, borderColor: "grey", elevation: 4,  }} 
				titleStyle={{color:"#000000"}}
				left={(props) => <Avatar.Icon {...props} size={40} color={LOGO_BRIGHT_BLUE} style={{backgroundColor:"#ffffff",borderWidth:1, borderColor:LOGO_BRIGHT_BLUE,}} icon="attachment" />}
				>
				<StagingDocument />
			</List.Accordion>
			</View>
			<View style={styles.tableColumn20pct}>
				<IconButton icon="delete-alert" color={"#ffffff"} style={{backgroundColor:LOGO_BRIGHT_BLUE}}  size={25} 
					onPress={() => { onDeleteAction(index-1); }} />
			</View>
		</View>
    );
};

class StagingDocuments extends Component {
    constructor(props) {
	    super(props);
	}

	render () {
    	const styles = getStyleSheet();
    	return (
			<View>
				<View style={{height:"82%"}}>
				{this.props.stagingDocuments == null || this.props.stagingDocuments.length == 0 ? 
					<View>
						<Text style={styles.textMediumBoldLogoDarkBlue}>{NO_STAGING_DOCUMENTS}</Text> 
					</View>
					: 
					<List.AccordionGroup>
						<FlatList
							data={this.props.stagingDocuments}
							renderItem={(params) => {
								return renderItem(params, this.props.deleteStagingDocument);
							}}
							keyExtractor={(item) => item._id}
							keyboardShouldPersistTaps='handled' 
							showsVerticalScrollIndicator={false}  />
					</List.AccordionGroup>
					}
				</View>
				{this.props.stagingDocuments.length > 0 ? 
				<Icon.Button name={"content-save-move"} size={25} borderRadius={10}
						backgroundColor={LOGO_BRIGHT_BLUE} 
						color={"#ffffff"} 
						onPress={() => {
							const documentIdsToStore = this.props.stagingDocuments.map(i => i._id);
							this.props.storeDocumentsAction(documentIdsToStore, this.props, this.props.storeStagingDocuments);
						}}
						style={{borderWidth:0.5, borderColor:LOGO_BRIGHT_BLUE, }}
						iconStyle={{margin:8,alignContent:'center'}} 
						>{SAVE_BANNER}</Icon.Button> : null }
			</View>
        )
    }
}

const mapStateToProps = ({ authReducer, documentsReducer }) => {
  const { mode, stagingDocuments, updatedDocument, storeDocumentsAction } = documentsReducer   ;
  const { accessCode, borrower } = authReducer;
  return { accessCode, borrower , mode, stagingDocuments, updatedDocument, storeDocumentsAction };
};

export default connect(mapStateToProps, { storeStagingDocuments, deleteStagingDocument, setStagingDocument })(StagingDocuments);