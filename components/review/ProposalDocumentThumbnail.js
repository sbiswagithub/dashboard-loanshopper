import React, { Component } from "react";
import { View,  } from 'react-native';
import { Subheading, Card, } from 'react-native-paper';
import { connect } from 'react-redux';
import { trackPromise } from "react-promise-tracker";
import * as Linking from 'expo-linking';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import getStyleSheet from '../../styles/styles';  
import { deleteDocument, fetchStoredDocuments, setProposalDocuments, openDocument  } from '../../actions';
import { EXPIRES_DATE, FILENAME, } from '../../constants/banners';
import { } from '../../constants/documents';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, BACKGROUND_LIGHT_BLUE, BLACK, TRANSPARENT,  } from '../../constants/colors';
import { } from '../../constants/apiUrls';

import ErrorDialog from '../ErrorDialog';
import SpinnerHolder from '../common/SpinnerHolder';


class ProposalDocumentThumbnail extends Component {
    constructor(props) {
		super(props);
	}

	render () {
		const styles = getStyleSheet();
		return (
			<View>
				<Card style={styles.fileDetailsCard }>
					<Card.Content >
						<Subheading style={styles.textSmallBoldLogoDarkBlue}>{this.props.item.filename}</Subheading>
						<View style={{flexDirection:"row", alignSelf:"stretch", justifyContent:"space-between"}}>
						<Subheading style={styles.textSmallBoldGray}>{EXPIRES_DATE}</Subheading>
						<Subheading style={styles.textSmallLogoDarkBlue}>{Moment(this.props.item.receivedDate).add(3, 'M').format('DD MMM YYYY')}</Subheading>
						</View>
						<View style={{flexDirection:"row", alignSelf:"stretch", justifyContent:"space-between"}}>
						<Subheading style={styles.textSmallBoldGray}>Sharing</Subheading>
						<FAIcon name={this.props.item.metadata.sharing == 'exclusive' ?  'user-circle' :  'users' } size={25} 
							color={LOGO_DARK_BLUE} backgroundColor={TRANSPARENT} iconStyle={{alignContent:'center', }} 
							
							></FAIcon>
						</View>
						<View style={styles.hr} />
						<View style={styles.space} />
						<View style={{flexDirection:"row", alignSelf:"stretch", justifyContent:"space-between"}}>
							<FAIcon name="external-link" 
								size={35} 
								color={LOGO_BRIGHT_BLUE}
								style={{borderColor:LOGO_BRIGHT_BLUE}}
								iconStyle={{margin:3,alignContent:'center'}} 
								onPress={ () => this.props.openDocument(this.props.item) } 
								/>
							<Icon name="delete" 
								size={35} 
								color={BLACK}
								style={{borderColor:LOGO_DARK_BLUE}}
								iconStyle={{margin:3,alignContent:'center'}} 
								onPress={() => 
									{
										trackPromise(this.props.deleteDocument(this.props.item))
										trackPromise(this.props.fetchStoredDocuments(this.props.setProposalDocuments))
									}} 
								/>							
						</View>
						<View style={styles.space}/>
						<View style={styles.space}/>
					</Card.Content>
				</Card>
				<SpinnerHolder />
				<ErrorDialog />
			</View>
        )
    }
}

const mapStateToProps = ({ authReducer }) => {
  const { accessCode } = authReducer;
  return { accessCode };
};

export default connect(mapStateToProps, { deleteDocument, fetchStoredDocuments, setProposalDocuments, openDocument })(ProposalDocumentThumbnail);