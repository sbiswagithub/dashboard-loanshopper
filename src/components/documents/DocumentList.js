import React, { Component } from "react";
import { Keyboard, Dimensions, View, Text, FlatList,  } from 'react-native';
import { Chip, List, Avatar  } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { toQueryString, handleFetchError, } from '../../actions';
import { } from '../../constants/banners';
import { } from '../../constants/documents';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE,  } from '../../constants/colors';

import StoredDocument from './StoredDocument';

const renderItem = ({ item, index, separators }) => {
	const styles = getStyleSheet();
	const description = item.filename;
	const file = item.filename.length > 28 ? item.filename.substring(0,25) + "..." : item.filename;
    return (
		<View style={[styles.tableRow, {marginTop:"5%"}]}>
			<View style={styles.tableColumn100pct}>
			<List.Accordion id={description} title={file} 
				style={{borderRadius: 5, borderWidth:0.5, width:"99%", borderColor: "grey", backgroundColor: LOGO_BRIGHT_BLUE,  elevation: 4,  }} 
				titleStyle={{color:"#000000"}}
				left={(props) => <Avatar.Icon {...props} size={25} color={LOGO_BRIGHT_BLUE} 
				style={{backgroundColor:LOGO_DARK_BLUE,}} icon="attachment" />}
				>
				<StoredDocument item={item} />
			</List.Accordion>
			</View>
		</View>
    );
  };

class DocumentList extends Component {
    constructor(props) {
	    super(props);
	}

	render () {
    	const styles = getStyleSheet();

    	return (
			<View>
				<View>
					<List.AccordionGroup>
						<FlatList
							data={this.props.storedDocuments}
							renderItem={renderItem}
							keyExtractor={(item) => item._id}
							keyboardShouldPersistTaps='handled' 
							showsVerticalScrollIndicator={false}  />
					</List.AccordionGroup>
				</View>
			</View>
        )
    }
}

const mapStateToProps = ({ documentsReducer }) => {
  const { mode, storedDocuments } = documentsReducer   ;
  return { mode, storedDocuments };
};

export default connect(mapStateToProps, { toQueryString, handleFetchError, })(DocumentList);