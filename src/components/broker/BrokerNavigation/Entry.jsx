import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, Image, Text } from "react-native";
import { Button, Paragraph, Dialog, Portal, } from 'react-native-paper';

import getStyles from "../../../styles/styles";
import * as banners from "./../../../constants/banners";
import { clearTrialAccountMessage  } from '../../../actions';
import EntryButton from "./../../common/EntryButton";

class Entry extends Component {

	  constructor(props) {
        super(props);
    }

    brokerEntryLabel() {
      return banners.BROKER_ENTRY.replace("{first_name}", this.props.brokerFirstName);
    } 

    render () {
      const s = getStyles();
      return (
        <View style={[s.container, s.alignCenter]}>
          <View
            style={[
              s.pb5,
              s.w90p,
              s.centerItems,
            ]}
          >
            <Image source={require("../../../assets/LoanShopper_LR.png")} style={s.logoMastheadWide} />
          </View>
          <View style={[{ flex: 1 }, s.centerItems]}>
          <Text style={[s.textMediumBoldLogoDarkBlue]}>{this.brokerEntryLabel()}</Text>
            <EntryButton icon={{ set: "ionicons", name: "people" }} 
              count={this.props.prospectsCount} onPressNavigate="ProspectSearch"  >
              {banners.LOAN_PROPOSALS}
            </EntryButton>
            <EntryButton icon={{ set: "faicons", name: "file-invoice-dollar" }} count={this.props.applicationsCount} >
              {banners.APPLICATIONS_TO_BROKER}
            </EntryButton>
            <EntryButton icon={{ set: "materialcommunityicons", name: "mailbox-open-up-outline", }} count={this.props.newMessagesCount} >
              {banners.MESSAGES}
            </EntryButton>
          </View>

            <Portal>
              <Dialog visible={this.props.showTrialAccountMessage} >
              <Dialog.Title>{banners.BROKER_INTRO_1}</Dialog.Title>
              <Dialog.Content><Paragraph>{banners.BROKER_INTRO_2}</Paragraph></Dialog.Content>
              <Dialog.Actions>
                <Button onPress={()=> {this.props.clearTrialAccountMessage()}}>{banners.CLOSE_BUTTON_BANNER}</Button>
              </Dialog.Actions>
              </Dialog>
            </Portal>      
        </View>
      );
    }
}




const mapStateToProps = ({ authReducer, brokerReducer }) => {
  const { showTrialAccountMessage, prospectsCount, applicationsCount, newMessagesCount, 
  brokerTitle, brokerFirstName, brokerLastName } = brokerReducer;
  const { accessCode, appEntryMode } = authReducer;
  return { accessCode, appEntryMode, showTrialAccountMessage, prospectsCount, applicationsCount, newMessagesCount,
  brokerTitle, brokerFirstName, brokerLastName };
};

export default connect(mapStateToProps, { clearTrialAccountMessage })(Entry);