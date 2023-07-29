import React, { } from 'react';
import { TextInput, Text, View } from 'react-native';
import { trackPromise,  } from 'react-promise-tracker';

import getStyleSheet from '../../styles/styles';  
import { API_ADDRESS_AUTOCOMPLETE_URI } from '../../constants/apiUrls';
import { ERROR_DIALOG_PUBLIC_MSG_1, ERROR_DIALOG_TITLE_1 } from '../../constants/banners';
import { TouchableHighlight } from 'react-native-gesture-handler';

export const  AddressSelect = (props) =>  {
	const styles = getStyleSheet();
	
    return (
		<View>
			<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, {marginTop:5, marginBottom:5}]} 
				selectTextOnFocus={true} 
				onBlur={props.addressOnBlur}
				value={props.addressSelection} 
				placeholder={props.addressPlaceholder}
				onChangeText={text =>  getFullAddresses(props,text)}  />
				{ props.addresses.length > 0 ? <AddressOptions {...props} /> : null }
        </View>
    )

};

const AddressOptions = (props) =>  {
	const styles = getStyleSheet();
    return (
      <View>
      {
		props.addresses.map((address) => {
			return (
			<TouchableHighlight  key={'address' + address.externalId} 
				onPressIn={() => {
					props.addressSelected({ ...address, addressIdx: address.externalId, addressStart: address.fullAddress, addressSelection: address.fullAddress})
					}}>
				<Text style={styles.dropdownOption}>{address.fullAddress == null ? "" : address.fullAddress}</Text>
			</TouchableHighlight>)
		})}
      </View>
    );
};

function getAddressText(addresses) {
	const addressLines = [];
	for (var index = 0; index < addresses.length; index++) {
		addressLines.push(addresses[index].fullAddress);
	}
	return addressLines;
}

const getFullAddresses = (props, input) =>   {
	//console.log(input)
	var addresses = []
    if (input === null || input === '') {
		// Ignore
    } else if (input.length % 5 === 0 && !props.addressSet) { 
    	// Check every 5 characters
	    const uri = `${API_ADDRESS_AUTOCOMPLETE_URI}` + '?match=\'' + input + '\''; 
		//console.log(uri)
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
		    .then((addresses) => {
					props.addressesFound({ addresses, addressStart: input });
		    })
		    .catch((error) => {
			    ////console.log('Boo in GET address autocomplete ' + error.statusText);
			    ////console.log(error);
			  	props.handleFetchError(error);	  						  	
		    }));
	  } else
	  	// Update textinput
		props.addressesFound({ addresses , addressStart: input });
};