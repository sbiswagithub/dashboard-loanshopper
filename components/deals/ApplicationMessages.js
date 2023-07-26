import React, { Component } from "react";
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Avatar, FAB, Portal, Dialog, Button, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';

import { DMY, SHOW } from '../../constants/common';
import getStyleSheet from '../../styles/styles';  
import { updatedTextMessage, loadApplicationMessages, toggleMessageDialog, onClickReviewButton, toApplication, showApplication } from '../../actions';
import { YOUR_MSGS } from '../../constants/banners';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, BACKGROUND_LIGHT_BLUE } from '../../constants/colors';
import * as RootNavigation from '../../actions/RootNavigation.js';

const renderAgentTitle = (message) => {
	const styles = getStyleSheet();
	const today = Moment().format() == Moment(message.timestamp).format() ;
	return (
		<View>
			{today ?
			<Card.Title title={Moment(message.timestamp).format('LT')} titleStyle={[styles.textSmallLogoDarkBlue, ]}
				right={(props) => 
				<Avatar.Icon size={40} icon="briefcase-account" 
							color={"#ffffff"} backgroundColor={LOGO_DARK_BLUE} 
							style={{alignSelf:"flex-start", left:-5}}  />}
			/> :
			<Card.Title title={Moment(message.timestamp).format("llll")} titleStyle={[styles.textSmallLogoDarkBlue, ]}
				right={(props) => 
				<Avatar.Icon size={40} icon="briefcase-account" 
							color={"#ffffff"} backgroundColor={LOGO_DARK_BLUE} 
							style={{alignSelf:"flex-start", left:-5}}  />}
			/> 
		}
		</View>
	);
}
const renderBorrowerTitle = (message) => {
	const styles = getStyleSheet();
	const today = Moment().format() == Moment(message.timestamp).format() ;
	return (
	<View>
		{ today ? 
		<Card.Title title={Moment(message.createdTs).format('LT')} titleStyle={[styles.textSmallWhite, ]}
				right={(props) => 
				<Avatar.Icon size={40} icon="account-outline" 
					color={LOGO_BRIGHT_BLUE} backgroundColor={"#ffffff"} 
					style={{alignSelf:"flex-start", left:-5}}  />}
			/> :
		<Card.Title title={Moment(message.createdTs).format("llll")} titleStyle={[styles.textSmallWhite, ]}
				right={(props) => 
				<Avatar.Icon size={40} icon="account-outline" 
					color={LOGO_BRIGHT_BLUE} backgroundColor={"#ffffff"} 
					style={{alignSelf:"flex-start", left:-5}}  />}
			/>
			}
	</View>	
	);
}
const renderMessageBubble = ({ item, index, separators }, props ) => {
	const styles = getStyleSheet();
	return (
	<View>	
	<Card style={ item.sender == "agent" ?
		{borderWidth:0.7, borderRadius:20, 
				alignSelf:"flex-end",  width:"75%",
				borderColor:LOGO_DARK_BLUE, backgroundColor:"#ffffff" } :
		{borderWidth:0.7, borderRadius:20, 
				alignSelf:"flex-start",  width:"75%",
				borderColor:LOGO_DARK_BLUE, backgroundColor:LOGO_BRIGHT_BLUE }
			}>

			{item.sender == "agent" ? renderAgentTitle(item) : renderBorrowerTitle(item)}

			<Card.Content><Text style={item.sender == "agent" ? styles.textMediumSmallBlue : styles.textSmallWhite} >{item.text}</Text></Card.Content>
		</Card>
		<View style={styles.space} />
		</View>	
	);
}

class ApplicationMessages extends Component {
    constructor(props) {
		super(props);
		this.props.fetchApplicationMessages({...this.props, 
			qParams : {applicationId: this.props.displayApplication._id}} , 
			this.props.loadApplicationMessages);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
		<View style={{flex: 1, flexDirection:'column', backgroundColor: BACKGROUND_LIGHT_BLUE}}>
			<LinearGradient
				colors={["#ffffff",BACKGROUND_LIGHT_BLUE]} style={styles.background}
				start={{x:0,y:1}} end={{x:0,y:0}} />

			<View style={styles.space} />
			<View style={styles.space} />
			<View style={styles.space} />
			<View style={styles.space} />
			<View style={styles.space} />
			<View style={{flexDirection:'row',justifyContent:'space-between', margin:10}}>
	    		<Text style={styles.textMediumBoldGray} >Messages</Text>
				<Icon.Button name="chevron-left" 
					borderRadius={20}
					backgroundColor={LOGO_BRIGHT_BLUE}
					color={"#ffffff"}
					height={40}
					width={40}
					iconStyle={{alignSelf:"center", marginLeft:2}}
					onPress={() => {
						RootNavigation.navigate('Menu');
					}} 
					/>
			</View>

			<View style={{height:"75%", margin:10}}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<FlatList 
							renderItem={(params) => {
								return renderMessageBubble(params, this.props);
							}}
							data={this.props.messages}
							keyExtractor={(item) => item._id}
							keyboardShouldPersistTaps='handled' />
				</ScrollView>
			</View>

			<Portal>
				<Dialog visible={this.props.messageDialog == SHOW} 
					onDismiss={() => {
						this.props.fetchApplicationMessages({...this.props, 
							qParams : {applicationId: this.props.displayApplication._id}} , 
							this.props.loadApplicationMessages);
					}}
					style={{borderRadius:10, height:"65%", top:-120 }} >
			      <Dialog.Content style={{height:"90%"}}>
						  <TextInput placeholder={YOUR_MSGS} clearTextOnFocus={true} autoCorrect={true} multiline={true} numberOfLines={30} 
						  	selectionColor={LOGO_BRIGHT_BLUE}  underlineColor={"#ffffff"}
							style={[styles.textMediumSmallBlue,{height:"100%", maxHeight:"100%" }]} 
							theme={{ colors: { text: LOGO_BRIGHT_BLUE } }}
						  	value={this.props.text}
							onChangeText={text => this.props.updatedTextMessage(text)}
							>
						  </TextInput>
			      </Dialog.Content>
			      <Dialog.Actions style={{height:"5%"}}>
					  <View style={styles.tableRow}>
						  <View style={[styles.tableColumn50pct, {alignItems:"flex-start"}]}>
							<Button  
								onPress={this.props.toggleMessageDialog}  
								icon={props =>
										<Avatar.Icon icon="close" size={40} 
											color={LOGO_BRIGHT_BLUE} backgroundColor={"#ffffff"} 
											borderWidth={1} borderColor={LOGO_BRIGHT_BLUE} />
											} />
						  </View>
						  <View style={[styles.tableColumn50pct, {alignItems:"flex-end"}]}>
							<Button  
								onPress={() => {
									this.props.postApplicationMessage(this.props, 
										() => {
											this.props.fetchApplicationMessages({...this.props, 
																		qParams : {applicationId: this.props.displayApplication._id}} , 
																		this.props.loadApplicationMessages);
											this.props.toggleMessageDialog();
										});
								}}  
								disabled={this.props.text == null}
								icon={props =>
										<Avatar.Icon icon="chat-plus" size={40} 
											color={LOGO_BRIGHT_BLUE} backgroundColor={"#ffffff"} 
											borderWidth={1} borderColor={LOGO_BRIGHT_BLUE} />
											} />							  
						  </View>
					  </View>
			      </Dialog.Actions>
				</Dialog>
			</Portal>

			<FAB 
				style={{alignSelf:"flex-end", margin:10, backgroundColor:LOGO_DARK_BLUE}} 
				color={"#ffffff"} icon="chat-plus" 
				onPress={this.props.toggleMessageDialog} />
		</View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer, dealsReducer }) => {
  const { displayApplication } = proposalCalendarReducer;
  const { accessCode } = authReducer;
  const { } = proposalReducer;
  const { updated, messageDialog, messages, postApplicationMessage, fetchApplicationMessages, text } = dealsReducer;
  return { updated, accessCode, messageDialog, messages, fetchApplicationMessages, postApplicationMessage, displayApplication, text };
};

export default connect(mapStateToProps, { updatedTextMessage, loadApplicationMessages, toggleMessageDialog, onClickReviewButton, toApplication, showApplication })(ApplicationMessages);