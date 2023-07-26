import React, { Component } from "react";
import { Text, View, TouchableOpacity, } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';
import getStyleSheet from '../../styles/styles';  

function NavigateButton(props) {
	  const navigation = useNavigation();
	  const styles = getStyleSheet();

	  return (
		<View>
		  <TouchableOpacity style={styles.grayButtonSmall} onPress={() => { navigation.openDrawer() }}  >
			<IconButton style={styles.darkBlueColor} icon="arrow-expand-left" size={20} />
	      </TouchableOpacity>
		</View>
	  );
	}

class SlideOutButton extends Component {
	render() {
	 return (
	    <View>
		  <NavigateButton/>
		</View>
	  );
	}
}

const mapStateToProps = ({ authReducer }) => {
  const { } = authReducer;
  return { };
};

export default connect(mapStateToProps, {  })(SlideOutButton);