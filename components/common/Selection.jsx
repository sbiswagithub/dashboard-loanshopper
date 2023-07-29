import React, { useState  } from 'react';
import { Text, View,  TextInput } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';

import getStyleSheet from '../../styles/styles';  

const Options = (props) =>  {
	const styles = getStyleSheet();
    return (
      <View>
      {props.options.map((option) => {
		  return (
			<TouchableHighlight  key={option} onPressIn={() => props.onSelect({item: option })}>
			<Text style={[styles.dropdownOption]} >{option}</Text>
			</TouchableHighlight> 
		  );
	  })}
      </View>
    );
};

export default function Selection(props) {
	const styles = getStyleSheet();
	const [showOptions, setShowOptions] = useState(false)
	const [selected, setSelected] = useState(props?.selection)
	const [filtered, setFiltered] = useState(props?.data === null ? [] : props.data)
	return (
		<>
			<TextInput style={[styles.whiteBgCentredTextInput]} 
				selectTextOnFocus={true} 
				placeholder={props.placeholder}
				value={selected}
				placeholder={props.placeholder}
				onFocus={() => {
					setShowOptions(true)
				}}
				onBlur={()=>{
					var matching = props.data.filter(element => element === undefined || selected === undefined ? [] : element.toLowerCase() == selected.toLowerCase())
					if (matching === null || matching.length === 0)
						props.onSelect(undefined)
					setShowOptions(false)
				}}
				onChangeText={(text) => {
					setShowOptions(true)
					setSelected(text)
					var matching = props.data.filter(element => element.toLowerCase().startsWith(text.toLowerCase()))
					setFiltered(matching === null || matching.length === 0 ? props.data : matching)
				}}   
				/>

				{
					showOptions ? 
					<Options 
						options={filtered} {...props} 
						onSelect={(selection) => {
							setSelected(selection.item)
							props.onSelect(selection)
							setShowOptions(false)
						}} /> : null
				}
		</>
	);
}