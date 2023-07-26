import React, { Component, useState } from "react";
import { Text, View, ScrollView, FlatList, TextInput } from 'react-native';
import { Card, Avatar, FAB, Portal, Dialog, Button,  } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';

import { DMY, SHOW } from '../../constants/common';
import getStyleSheet from '../../styles/styles';  
import { updatedTextMessage, loadApplicationMessages, toggleMessageDialog, onClickReviewButton, toApplication, showApplication, 
	getBrokerMessages, handleFetchError, sendBrokerMessage, updateMessageStatus } from '../../actions';
import { YOUR_MSGS } from '../../constants/banners';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, BACKGROUND_LIGHT_BLUE, TRANSPARENT, WHITE, HIGHLIGHTED_YELLOW } from '../../constants/colors';
import * as RootNavigation from '../../actions/RootNavigation.js';
import { trackPromise } from "react-promise-tracker";
import ErrorDialog from '../ErrorDialog'
import SpinnerHolder from '../common/SpinnerHolder'

const MessageInput = (props) => {
	const styles = getStyleSheet();
	const [value, onChangeText] = React.useState(YOUR_MSGS);

  return (
    <View
      style={{ borderBottomColor: WHITE, borderBottomWidth: 1, }}>
      <TextInput
        editable
		multiline
		clearTextOnFocus
        numberOfLines={4}
        onChangeText={text => {
			onChangeText(text)
			props.onUpdate(text)
		}}
        value={value}
        style={{padding: 10, color:WHITE}}
      />
    </View>
  );
}

const renderTitle = (message) => {
	const styles = getStyleSheet();
	const format = Moment().format() == Moment(message.timestamp).format() ? 'LT' : 'llll';
	return (
		<View>
			<Card.Title title={Moment(message.timestamp).format(format)} titleStyle={[styles.textSmallBoldBlue, ]}
				right={(props) => 
				<Avatar.Icon size={50} icon={message.sender == "agent" ? "briefcase-account" : "account-outline"} 
							color={LOGO_BRIGHT_BLUE} backgroundColor={LOGO_DARK_BLUE} 
							style={{alignSelf:"flex-start", left:-5,backgroundColor:{TRANSPARENT}}}  />}
			/>
		</View>
	);
}

const renderMessageBubble = ({ item, index, separators }, props ) => {
	const styles = getStyleSheet();
	return (
	<View id={item._id}>	
	<Card style={ item.sender == "agent" ?
		{borderWidth:0, borderRadius:20, 
				alignSelf:"flex-end",  width:"85%",
				borderColor:LOGO_DARK_BLUE, backgroundColor: item.status == "seen" ? WHITE : LOGO_BRIGHT_BLUE} :
		{borderWidth:2, borderRadius:20, 
				alignSelf:"flex-start",  width:"85%",
				borderColor:item.status == "seen" ? LOGO_DARK_BLUE : LOGO_BRIGHT_BLUE, backgroundColor:TRANSPARENT }
			}>

			{renderTitle(item)}

			<Card.Content>
				<Text style={item.sender == "agent" ? styles.textMediumLogoDarkBlue : styles.textMediumGray} >{item.text}</Text>
				</Card.Content>
		</Card>
		<View style={styles.space} />
		</View>	
	);
}


const reloadMessages = (props) => {
	trackPromise( props.getBrokerMessages({...props, 
		qParams : {brokerAgentId: props?.displayProposal?.agent?._id}} , 
		props.loadApplicationMessages, props.handleFetchError) )		
}

class BrokerMessages extends Component {
    constructor(props) {
		super(props);
		this.state = {
			textMessage : this.props.text
		}
	}

	componentDidMount() {
		reloadMessages(this.props);
		this.messagePoller = setInterval(() => {
				reloadMessages(this.props);
						}, 60000)		
	}

    componentWillUnmount() {
        clearInterval(this.messagePoller)
    }

    render () {
    	const styles = getStyleSheet();
    	return (
		<View style={{flex: 1, flexDirection:'column', maxHeight:'60%', backgroundColor: TRANSPARENT}}>
			<View style={[{flexDirection: "row", justifyContent:"space-between"}]}>
			<Text style={[styles.textMediumBoldGray, {alignSelf:"center"}]} >Messages</Text>
			<FAB 
				style={{alignSelf:"flex-end", margin:10, backgroundColor:LOGO_DARK_BLUE}} 
				color={"#ffffff"} icon="chat-plus" onPress={this.props.toggleMessageDialog} />
			</View>
			<View>
				<ScrollView showsVerticalScrollIndicator={false}>
					<FlatList 
							renderItem={(params) => {
								if (params.item.status == 'unseen' && params.item.sender == 'agent') {
									setTimeout(
										() => {
											trackPromise(this.props.updateMessageStatus(
													{status: 'seen', textMessageId: params.item._id}
												),reloadMessages(this.props),this.props.handleFetchError)
										}, 
										15000
									)
								}
								return renderMessageBubble(params, this.props);
							}}
							data={this.props.messages}
							keyExtractor={(item) => item._id}
							keyboardShouldPersistTaps='handled' />

				</ScrollView>
			</View>
			<Portal>
				<Dialog visible={this.props.messageDialog == SHOW} 
					onDismiss={() => {reloadMessages(this.props)}}
					style={{borderRadius:45, height:"65%", position: 'absolute' , top:'0%', backgroundColor:LOGO_DARK_BLUE }} >
			      <Dialog.Content style={{height:'80%'}}>
						<MessageInput onUpdate={this.props.updatedTextMessage} />
			      </Dialog.Content>
			      <Dialog.Actions >
					  <View style={styles.tableRow}>
						  <View style={[styles.tableColumn50pct, {alignItems:"flex-start"}]}>
							<Button  
								onPress={this.props.toggleMessageDialog}  
								icon={props =>
										<Avatar.Icon icon="close" size={40} 
											color={LOGO_BRIGHT_BLUE} backgroundColor={TRANSPARENT} 
											borderWidth={1} borderColor={LOGO_BRIGHT_BLUE} 
											style={{backgroundColor:WHITE, color:LOGO_BRIGHT_BLUE}} />
											} />
						  </View>
						  <View style={[styles.tableColumn50pct, {alignItems:"flex-end"}]}>
							<Button  
								onPress={() => {
									trackPromise(
										this.props.sendBrokerMessage(
											{brokerAgentId: this.props?.displayProposal?.agent?._id, text:this.props.text}, 
											() => {reloadMessages(this.props)},
											this.props.handleFetchError)
									);
									this.props.toggleMessageDialog();
								}}  
								disabled={this.props.text == null}
								icon={props =>
										<Avatar.Icon icon="chat-plus" size={40} 
											color={LOGO_BRIGHT_BLUE} backgroundColor={WHITE} 
											borderWidth={1} borderColor={LOGO_BRIGHT_BLUE}
											style={{backgroundColor:WHITE, color:LOGO_DARK_BLUE}} />
											} />							  
						  </View>
					  </View>
			      </Dialog.Actions>
				</Dialog>
			</Portal>
			<ErrorDialog />
			<SpinnerHolder />
		</View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer, dealsReducer }) => {
  const { displayProposal } = proposalCalendarReducer;
  const { accessCode } = authReducer;
  const { } = proposalReducer;
  const { messageDialog, messages, postApplicationMessage,  text } = dealsReducer;
  return { accessCode, messageDialog, messages,  postApplicationMessage, displayProposal, text };
};

export default connect(mapStateToProps, { updatedTextMessage, loadApplicationMessages, toggleMessageDialog, onClickReviewButton, 
	toApplication, showApplication, getBrokerMessages, sendBrokerMessage, updateMessageStatus, handleFetchError })(BrokerMessages);