import React, { Component } from "react";
import { View,  } from 'react-native';
import { Subheading, Card, } from 'react-native-paper';
import { connect } from 'react-redux';
import { trackPromise } from "react-promise-tracker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import getStyleSheet from '../../styles/styles';  
import { deleteDocument, fetchStoredDocuments, setProposalDocuments, openDocument,  } from '../../actions';
import { EXPIRES_DATE, } from '../../constants/banners';
import { } from '../../constants/documents';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, TRANSPARENT,  } from '../../constants/colors';
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
			<View style={{alignSelf:"flex-start"}}>
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
						<View style={{flexDirection:"row", alignSelf:"stretch", justifyContent:"flex-start"}}>

							<FAIcon.Button name="external-link" size={20} borderRadius={25} 
								backgroundColor={LOGO_BRIGHT_BLUE} color={LOGO_DARK_BLUE} 
								onPress={ () => this.props.openDocument(this.props.item) }  >{'Open'}</FAIcon.Button>	

							<Icon.Button name="delete" size={20} borderRadius={25} 
								backgroundColor={LOGO_BRIGHT_BLUE} color={LOGO_DARK_BLUE} 
								onPress={() => 
									{
										trackPromise(this.props.deleteDocument(this.props.item))
										trackPromise(this.props.fetchStoredDocuments(this.props.setProposalDocuments))
									}}  >{'Remove'}</Icon.Button>	


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

const mapStateToProps = ({ authReducer, proposalReducer }) => {
  const { selectedDocumentTypeForUpload } = proposalReducer;
  const { accessCode } = authReducer;
  return { accessCode, selectedDocumentTypeForUpload };
};

export default connect(mapStateToProps, { deleteDocument, fetchStoredDocuments, setProposalDocuments, openDocument,  })(ProposalDocumentThumbnail);