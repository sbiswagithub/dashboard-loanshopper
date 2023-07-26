import React, { Component, useState  } from 'react';
import { Text, View,  TouchableOpacity, TextInput } from 'react-native'

import getStyleSheet from '../../styles/styles';  

const Options = (props) =>  {
    const items = [];
	const styles = getStyleSheet();
	for (const [index, option] of props.options.entries()) {
		items.push(
		<TouchableOpacity  key={index} onPress={() => props.onSelect({index: index, item: option })}>
			<Text style={[styles.dropdownOption]} >{option}</Text>
			</TouchableOpacity>
		)
	}
    return (
      <View>
      {items}
      </View>
    );
};

export default function Selection(props) {
	const styles = getStyleSheet();
	const [showOptions, setShowOptions] = useState(false)
	const [selected, setSelected] = useState(props?.selection)
	const [filtered, setFiltered] = useState(props?.data == null ? [] : props.data)
	return (
		<>
			<TextInput style={[styles.whiteBgCentredTextInput]} 
				clearTextOnFocus={true} 
				placeholder={props.placeholder}
				value={selected}
				placeholder={props.placeholder}
				onFocus={() => {
					setShowOptions(true)
					setSelected(null)
				}}
				onBlur={()=>{
					setShowOptions(false)
				}}
				onChangeText={(text) => {
					setShowOptions(true)
					setSelected(text)
					var matching = props.data.filter(element => element.toLowerCase().startsWith(text.toLowerCase()))
					setFiltered(matching == null || matching.length == 0 ? props.data : matching)
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