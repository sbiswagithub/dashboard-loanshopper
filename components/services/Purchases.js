import React, { Component } from "react";
import { View, ScrollView } from 'react-native';
import { Button, DataTable , List, Headline, FAB , Avatar, Surface, Text, Card, Title, Paragraph, Subheading } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { } from '../../actions';
import { } from '../../constants/banners';

class Purchases extends Component {
    constructor(props) {
	    super(props);
	}

    render () {
    	const styles = getStyleSheet();
		const LeftContent = props => <Avatar.Icon {...props} icon="account-tie-voice-outline" />

    	return (
			<View style={{height: 585}} >
				<List.AccordionGroup>
					<List.Accordion description="Bank statements" id="2" left={props => <List.Icon  {...props} icon="credit-card-clock" />}>
						<ScrollView showsVerticalScrollIndicator={false} style={{height:200}}>
						</ScrollView>
					</List.Accordion>
					<View style={styles.hr} />
					<List.Accordion description="Credit check" id="3" left={props => <List.Icon  {...props} icon="account-cash" />}>
						<ScrollView showsVerticalScrollIndicator={false} style={{height:200}}>
						</ScrollView>
					</List.Accordion>
					<View style={styles.hr} />
				</List.AccordionGroup>
				
			</View>
        )
    }
}

const mapStateToProps = ({ documentsReducer }) => {
  const { } = documentsReducer  ;
  return {  };
};

export default connect(mapStateToProps, {  })(Purchases);