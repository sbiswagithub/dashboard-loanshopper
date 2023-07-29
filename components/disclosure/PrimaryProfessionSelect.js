import React, { Component } from 'react';
import { TextInput, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { trackPromise, usePromiseTracker  } from 'react-promise-tracker';

import getStyleSheet from '../../styles/styles';  
import { professionsFound, professionSelected, professionUnSelected, professionsOnBlur, handleFetchError, toQueryString } from '../../actions';
import { PRIMARY_PROFESSION_DEFAULT } from '../../constants/disclosure';
import { API_PROFESSIONS_AUTOCOMPLETE_URI } from '../../constants/apiUrls';
import { TouchableHighlight } from 'react-native-gesture-handler';


function ProfessionOptions(props) {
	const styles = getStyleSheet();
	
    return (
      <View>
      {props.professions.map((profession) => {
		  return (
			<TouchableHighlight  key={profession?._idx} onPressIn={() => props.professionSelected({ profession: profession})}>
				<Text style={styles.dropdownOption}>{profession?.name == null ?  "" : profession.name}</Text>
			</TouchableHighlight>
		  );
	  })}
      </View>
    );
}

function ProfessionSelect(props) {
	const styles = getStyleSheet();
  	getProfessions(props, null);
    return (
		<View>
			<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, {marginTop:5, marginBottom:5}]} selectTextOnFocus={true} 
				onBlur={props.professionsOnBlur}
				value={props.profession} 
				selectTextOnFocus={true} 
				placeholder={PRIMARY_PROFESSION_DEFAULT}
				onChangeText={text =>  getProfessions(props,text)}  />
				{ props.professions.length > 0 ? <ProfessionOptions {...props} /> : null }
				</View>
    )
}

function  getProfessions(props, input) {
	var professions = []
    if (input === null || input === '') {
      return [];
    } else if (input.length % 3 === 0 && !props.professionSet) { // Check every two characters to prevent endless API calls
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
			    props.professionsFound(JSON.parse(payload), input);
		    })
		    .catch((error) => {
			    ////console.log('Boo in GET professions');
			    ////console.log(error);
			  	props.handleFetchError(error);	  						  	
		    }));
  	} else {
		console.log('Dumb update ' + input)
	  	// Update textinput
		props.professionsFound({ professions , input });
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
		<View style={{ flexDirection:'column', justifyContent: 'space-around',width:'80%' }}>
        	<ProfessionSelect {...this.props} />
        </View>
    )
  }
}


const mapStateToProps = ({ disclosureReducer, authReducer }) => {
  const { professionSet, professionIdx, professionPart, professions, profession } = disclosureReducer;
  const { accessCode } = authReducer;
  return { accessCode, professionSet, professionIdx, professionPart, professions, profession };
};

export default connect(mapStateToProps, { professionsFound, professionSelected, professionUnSelected,professionsOnBlur, handleFetchError })(PrimaryProfessionSelect);