import React, { Component } from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import { TextInput, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { trackPromise, usePromiseTracker  } from 'react-promise-tracker';

import getStyleSheet from '../../styles/styles';  
import { professionsFound, professionSelected, professionUnSelected, handleFetchError, toQueryString } from '../../actions';
import { PRIMARY_PROFESSION_DEFAULT } from '../../constants/disclosure';
import { API_PROFESSIONS_AUTOCOMPLETE_URI } from '../../constants/apiUrls';
import { ERROR_DIALOG_TITLE_1, ERROR_DIALOG_PUBLIC_MSG_1 } from '../../constants/banners';


function ProfessionOptions(props) {
    const items = [];
	const styles = getStyleSheet();
	for (const [index,profession] of props.professions.entries()) {
      items.push(
      <TouchableOpacity  key={index}
      	onPress={() => props.professionSelected({index : index, profession: profession})}>
	    <Text style={styles.dropdownOption}>{profession?.name == null ?  "" : profession.name}</Text>
	    </TouchableOpacity>
      )
    }
    return (
      <View style={{width:250}}>
      {items}
      </View>
    );
}

function ProfessionSelect(props) {
	const styles = getStyleSheet();
    const { promiseInProgress } = usePromiseTracker();
  	getProfessions(props, null);
    return (
		<View>
        {props.professionSet ? null : 
      	  (
	        <Autocomplete
	        	data={getProfessionNames(props.professions)}
	        	style={[styles.whiteBgCentredTextInputTaller, styles.disclTextEntryWide, {marginLeft:5, marginRight:5}]}
	        	inputContainerStyle={styles.autoComplete}
				listContainerStyle={styles.disappear}
	        	clearTextOnFocus={true}
	        	placeholder={PRIMARY_PROFESSION_DEFAULT}
		        onChangeText={(text) =>  getProfessions(props,text)}
	        	renderItem={({ name }) => ( <View/> )}
	      	/> 
	      	 )}
	        <View style={{marginLeft:5, marginRight:5}}>
	          { props.professionSet ? 
	        		  ( <TextInput style={[styles.whiteBgCentredTextInputTaller, styles.disclTextEntryWide, {marginTop:5, marginBottom:5, }]} clearTextOnFocus={true} 
	        		  		multiline={props.profession.length > 20}
	        		  		onFocus={() => props.professionUnSelected()} 
	        		  		value={props.profession} /> ) : 
	        		  props.professions.length > 0 ? 
	        		  	<ProfessionOptions 
	        		  		professions={props.professions} 
	        		  		professionSelected={props.professionSelected} /> : null
				}
	        </View>
        </View>
    )
}

function  getProfessions(props, input) {
    if (input === null || input === '') {
      return [];
    } else if (props.professionPart === input) { // no change in state
    } else if (input.length % 2 === 0 && !props.professionSet) { // Check every two characters to prevent endless API calls
		const uri = `${API_PROFESSIONS_AUTOCOMPLETE_URI}` + toQueryString({lookup : input});
		trackPromise(
			fetch(uri , {
			    headers: { 'Authorization': props.accessCode },
			})
		    .then(response => {
				if (response.status >= 400 && response.status < 600) {
	                const error = Object.assign({}, {
	                    status: response.status,
	                    statusText: response.statusText,
	                    showDialog: true, 
	                    dialogTitle: ERROR_DIALOG_TITLE_1, 
	                    publicMessage: ERROR_DIALOG_PUBLIC_MSG_1, 
                    	logMessage: 'Failed to connect to ' + uri
	                });
	                return Promise.reject(error);
				} else
		    		return response.json();
		    })
		    .then((payload) => {
			    props.professionsFound(payload, input);
		    })
		    .catch((error) => {
			    ////console.log('Boo in GET professions');
			    ////console.log(error);
			  	props.handleFetchError(error);	  						  	
		    }));
  	}
}

function getProfessionNames(professions) {
	const names = [];
	for (var index = 0; index < professions.length; index++) {
		names.push(professions[index].name);
	}
	return names;
}

class PrimaryProfessionSelect extends Component {

  constructor(props) {
    super(props);
  }

  render () {
  	const styles = getStyleSheet();
    return (
		<View style={{ flexDirection:'column', justifyContent: 'space-around' }}>
        	<ProfessionSelect 
        		accessCode={this.props.accessCode}
				professionSet={this.props.professionSet}
				professions={this.props.professions}
				professionIdx={this.props.professionIdx}
				professionPart={this.props.professionPart}
				professionsFound={this.props.professionsFound}
				professionSelected={this.props.professionSelected}
				professionUnSelected={this.props.professionUnSelected}
				profession={this.props.profession}
				 />
        </View>
    )
  }
}


const mapStateToProps = ({ disclosureReducer, authReducer }) => {
  const { professionSet, professionIdx, professionPart, professions, profession } = disclosureReducer;
  const { accessCode } = authReducer;
  return { accessCode, professionSet, professionIdx, professionPart, professions, profession };
};

export default connect(mapStateToProps, { professionsFound, professionSelected, professionUnSelected, handleFetchError })(PrimaryProfessionSelect);