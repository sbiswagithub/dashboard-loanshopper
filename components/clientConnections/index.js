import React, { Component, useState  } from "react";
import { View, Text , ScrollView, } from 'react-native';
import { Card,  Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from "expo-linear-gradient";
import Constants from 'expo-constants';

import { trackPromise, } from 'react-promise-tracker';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, TRANSPARENT, WHITE } from '../../constants/colors';
import { fetchBrokerAgent, acceptClientConnection, rejectClientConnection, fetchNewClientConnections, fetchActiveClientConnections, setClientConnections, 
  addConnectionBrokerDetails, callNumber, openUrl, handleFetchError,  onClickApplyButton, showMyAccount, setAcceptedConnections } from "../../actions";
import { CONNECTION_MSG_1, CONNECTION_MSG_2 } from "../../constants/banners";
import SpinnerHolder from "../common/SpinnerHolder";
import ErrorDialog from "../ErrorDialog";

function BrokerConnection(props) {
  const [brokerConnection,setBrokerConnection] = useState(props.clientConnection)
  const [broker,setBroker] = useState(props?.brokerAgent)
  const styles = getStyleSheet();
  if (brokerConnection && !broker)
    trackPromise(
      props.fetchBrokerAgent(
        brokerConnection.brokerAgentId, 
        (broker) => {
          props.addConnectionBrokerDetails(broker)
          setBroker(broker)
        } , 
        (error) => {
          props.handleFetchError(error);
        })) 
    
   console.log(broker)

   const companyDetails = broker?.brokerAgency?.companyDetails ? broker?.brokerAgency?.companyDetails : { companyName : 'Not provided'}

   return (
    <Card key={new Date().getMilliseconds() + brokerConnection.brokerAgentId} 
      style={{elevation: 4, borderColor:{LOGO_DARK_BLUE}, borderRadius:20, marginBottom:"5%",  }}   >
					<LinearGradient
							colors={[
							LOGO_DARK_BLUE,
							LOGO_BRIGHT_BLUE,
							]}
							style={[styles.background, { borderWidth: 6, borderRadius:20,borderColor: LOGO_BRIGHT_BLUE}]}
							start={{ x: 0.5, y: 1 }}
							end={{ x: 0.5, y: 0 }}
						/>

    {broker == null ? null : 
      <View style={{flexDirection:"column",justifyContent:"space-between"}}  >
        <View style={{flexDirection:"row"}}>
          <Card.Title title={broker.fullName} subtitle={broker?.brokerAgency?.companyDetails?.companyName} subtitleNumberOfLines={1} 
            titleStyle={styles.textMediumBoldLogoDarkBlue} subtitleStyle={[styles.textSmallLogoDarkBlue, {marginRight:3}]} style={{flexGrow:1,}} />
          {brokerConnection?.status === 'accepted' ? null : 
            <Icon.Button name={'delete-circle-outline'} size={40} borderRadius={0} 
                backgroundColor={TRANSPARENT}  color={"red"} 
                iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
                onPress={() => {
                  trackPromise(
                    props.rejectClientConnection(
                      brokerConnection, 
                      (response) => {
                        props.fetchNewClientConnections(props.setClientConnections, 
                          (error) => {
                            Promise.reject(error)
                          })
                      }, 
                      (error) => {
                        props.handleFetchError(error);
                      })
                  )
                    }} /> }
        </View>
        <View style={styles.hrWhite} />
        <Card.Content>
          <View>
            {brokerConnection?.status === 'accepted' ? 
            null
            : 
            <View>
              <Text style={[styles.textMediumWhite]}>{CONNECTION_MSG_1.replaceAll('{agent_name}',broker?.firstName).replaceAll('{agency_name}',broker?.brokerAgency?.companyDetails?.companyName ? broker?.brokerAgency?.companyDetails?.companyName : 'unknown agency')}</Text>
              <View style={styles.space} />
              <Button icon="link" mode="contained" style={{paddingLeft:"2%", marginLeft:"2%", borderRadius:20, alignSelf:"center", backgroundColor:{LOGO_DARK_BLUE}}} 
                style={{backgroundColor:LOGO_DARK_BLUE}}
                labelStyle={{color:WHITE,}} uppercase={false} 
                onPress={() => {
                  trackPromise(
                    props.acceptClientConnection(
                      brokerConnection, 
                      (response) => {
                        console.log(response)
                        trackPromise(
                          props.fetchNewClientConnections(
                            (connections) => {
                              console.log(connections)
                              props.setClientConnections(connections)
                              props.onClickApplyButton()
                            }, 
                            (error) => {
                              console.log(connections)
                              Promise.reject(error)
                            })
                        )
                      }, 
                      (error) => {
                          props.handleFetchError(error);
                        })
                  )
                }} >Connect</Button>
              <View style={styles.space} />
              <Text style={[styles.textSmallWhite]}>{CONNECTION_MSG_2.replaceAll('{agent_full_name}',broker?.fullName)}</Text>
            </View>
            }

            <View style={[{flexDirection:"row", alignSelf:"center", justifyContent:"space-between", margin:'10%'}]}>
                {Constants.platform.web ? 
                <Text style={[styles.textMediumWhite]}>{broker.contact.primaryPhone}</Text>
                : 
                <Icon.Button name={'phone'} size={30} borderRadius={0}  backgroundColor={TRANSPARENT}  color={LOGO_BRIGHT_BLUE} 
                  onPress={() => {
                    props.callNumber(broker.contact.primaryPhone)
                  }} />}

                {!broker?.brokerAgency?.companyDetails?.companyWebsite ? null : 
                <Icon.Button name={'web'} size={30} borderRadius={0} backgroundColor={TRANSPARENT}  color={LOGO_BRIGHT_BLUE}  
                  onPress={() => {
                    props.openUrl(broker.brokerAgency.companyDetails.companyWebsite)
                  }} />}

                {!broker?.brokerAgency?.companyDetails?.companyFacebook ? null : 
                <Icon.Button name={'facebook'} size={30} borderRadius={0} backgroundColor={TRANSPARENT}  color={LOGO_BRIGHT_BLUE}  
                  onPress={() => {
                    props.openUrl(broker.brokerAgency.companyDetails.companyFacebook)
                  }} />}

                {!broker?.brokerAgency?.companyDetails?.companyLinkedIn ? null : 
                <Icon.Button name={'linkedin'} size={30} borderRadius={0} backgroundColor={TRANSPARENT}  color={LOGO_BRIGHT_BLUE} 
                  onPress={() => {
                    props.openUrl(broker.brokerAgency.companyDetails.companyLinkedIn)
                  }} />}

            </View>
          
          </View>

        </Card.Content>
      </View>
      }
      <SpinnerHolder />
    </Card>
    );
}

class ClientConnections extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
      trackPromise(
        this.props.fetchActiveClientConnections( this.props.setAcceptedConnections, this.props.handleFetchError )
      )
    }

    render () {
      const styles = getStyleSheet();
      var items = [];
      if (this.props?.clientConnections)
        for (const [index, clientConnection] of this.props.clientConnections.entries()) {
          var brokerAgent = this.props.brokerDetailsList.find(e => e._id === clientConnection.brokerAgentId);
          items.push(
            <BrokerConnection key={clientConnection._id} clientConnection={clientConnection} brokerAgent={brokerAgent} {...this.props} /> 
          )
        }          
      if (this.props?.acceptedConnections)
        for (const [index, clientConnection] of this.props.acceptedConnections.entries()) {
          var brokerAgent = this.props.brokerDetailsList.find(e => e._id === clientConnection.brokerAgentId);
          items.push(
            <BrokerConnection key={clientConnection._id} clientConnection={clientConnection} brokerAgent={brokerAgent} {...this.props} /> 
            )
        }

    	return (
			  <View style={{maxHeight:"95%",alignItems:'flex-start', alignSelf:"flex-start", marginLeft:'5%'}}>
          <View style={styles.space} />
          {this.props?.clientConnections && this.props?.clientConnections.length > 0 ? 
            <Text style={styles.textMediumBoldLogoDarkBlue}>Someone wants to connect with you!</Text> : 
            <Text style={styles.textMediumBoldLogoDarkBlue}>Your broker connections!</Text> }
            <View style={styles.space} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' style={{padding:"5%", alignSelf:"stretch"}} >
              {items}
            </ScrollView>
            <SpinnerHolder />
		    </View>
        );
    }
}

const mapStateToProps = ({ homeReducer, accountReducer }) => {
  const { clientConnections, brokerDetailsList } = homeReducer;
  const { acceptedConnections } = accountReducer;

  return { clientConnections, brokerDetailsList, acceptedConnections };
};

export default connect(mapStateToProps, { fetchBrokerAgent, acceptClientConnection, rejectClientConnection, fetchNewClientConnections,fetchActiveClientConnections, setClientConnections, 
  addConnectionBrokerDetails, callNumber, openUrl, handleFetchError, onClickApplyButton, showMyAccount, setAcceptedConnections })(ClientConnections);