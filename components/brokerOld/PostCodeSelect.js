import React, { Component } from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';

import getStyleSheet from '../../styles/styles';  
import { postcodesFound, postcodeSelected, postcodeUnSelected } from '../../actions';
import { PCODE_BANNER_1 } from '../../constants/banners';
import { API_POSTCODE_URI } from '../../constants/apiUrls';

class PostCodeSelect extends Component {

  constructor(props) {
    super(props);
  }

  renderPostCodeOptions(postCodeData) {
    const items = [];
    for (const [index, data] of postCodeData.entries()) {
      items.push(
	  <CheckBox
	      title={data.locality == null ? "" : data.locality}
          onPress={() => this.togglePostCodeSelect(data)}
	    />
      )
    }
    return (
      <View>
      {items}
      </View>
    );
  }

  togglePostCodeSelect(data) {
	if (!this.props.postCodeSet) {
		this.props.postcodeSelected({ idx: --data.idx, query: data.locality});
	} else {
		this.clearPostCodeData();
	} 
  }

  clearPostCodeData() {
	 this.props.postcodeUnSelected();
  }  
  
  getPostCodeOptions(input) {
    if (input === null || input === '') {
      return [];
    } else if (this.props.query === input) { // no change in state
    } else if (input.length % 2 === 0 && !this.props.postCodeSet) { // Check every two characters to prevent endless API calls
		fetch(`${API_POSTCODE_URI}` + input ).then(res => res.json()).then((json) => {
			// Expect JSON like so
			// {"options": [
			//		{"idx": 1, "postCode": "101","locality": "101 Lane Cove NSW"}, ..]}
		    const { options: postCodes } = json;
		    this.props.postcodesFound({ postCodes, query: input });
		});
  	}
  }

  render () {
  	const styles = getStyleSheet();
  	this.getPostCodeOptions(null);
    return (
		<View style={styles.postboxACOuter}>
        {this.props.postCodeSet ? null : 
      	  (
	        <Autocomplete
	        	data={this.props.postCodes}
	        	style={styles.textInput}
	        	inputContainerStyle={styles.autoComplete}
        		listStyle={styles.autoComplete}
	        	clearTextOnFocus={true}
	        	defaultValue={PCODE_BANNER_1}
		        onChangeText={text =>  this.getPostCodeOptions(text)}
	        	renderItem={({ locality }) => (
	        	        <TouchableOpacity>
	        	        </TouchableOpacity>
	        	      )}
	      	/> 
	      	 )}
	        <View>
	          { this.props.postCodeSet ? 
	        		  ( <TextInput style={styles.textInput} clearTextOnFocus={true} 
	        		  		onFocus={() => this.clearPostCodeData()} 
	        		  		value={this.props.postCodes[this.props.idx].locality} /> ) : 
	        		  this.props.postCodes.length > 0 ? 
	        			  (this.renderPostCodeOptions(this.props.postCodes)) : null
				}
	        </View>
        </View>
    )
  }
}


const mapStateToProps = ({ homeReducer }) => {
  const { postCodeSet, idx, query, postCodes } = homeReducer;
  return { postCodeSet, idx, query, postCodes };
};

export default connect(mapStateToProps, { postcodesFound, postcodeSelected, postcodeUnSelected })(PostCodeSelect);