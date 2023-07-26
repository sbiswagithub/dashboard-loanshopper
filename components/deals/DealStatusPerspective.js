import React, { Component } from "react";
import { View, ScrollView } from 'react-native';
import { Chip , List, Headline, FAB , Avatar, Surface, Text, Card, Title, Paragraph, Subheading } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { closeDeals } from '../../actions';
import { DEALS_BANNER, UNDER_ASSESSMENT_BANNER, CONDITIONALLY_APPROVED_BANNER } from '../../constants/banners';

class DealStatusPerspective extends Component {
    constructor(props) {
	    super(props);
	}

    render () {
    	const styles = getStyleSheet();

    	return (
			<View style={{flexDirection:'column',height:"93%",width:"97%"}}>
				<View style={styles.space}/>
				<View style={{flexDirection:'row',justifyContent:'space-between'}}>
					<Text style={styles.textMediumBoldGray} >{DEALS_BANNER}</Text>
					<Icon.Button name="closesquareo" size={20} borderRadius={25}
						backgroundColor={'#000000'} iconStyle={{margin:8}} 
						onPress={() => this.props.closeDeals()} />
				</View>
				<View style={styles.space}/>
				<List.AccordionGroup>
					<List.Accordion description={UNDER_ASSESSMENT_BANNER} id="1" 
						left={props => <Chip icon="auto-fix">{this.props.numUnderAssessment}</Chip>}>
						<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{padding:10, }}>
							<FAB
								style={styles.fabArrow}
								small
								color={"#ffffff"}
								icon="chevron-left-circle" />
							<Surface style={styles.surface}>
								<Headline style={{alignSelf:"flex-start"}}>Mortgage Solutions</Headline>
								<View style={styles.hr}/>
								<View style={{height:120}}>
									<View style={styles.tableRow}>
										<View style={[styles.tableColumn20pct]}>    		
										<Subheading style={{alignSelf:"flex-start"}}>Product :</Subheading>
										</View>
										<View style={[styles.tableColumn60pct]}>
										<Paragraph>ANZ Breakfree</Paragraph>
										</View>
									</View>
									<View style={styles.tableRow}>
										<View style={[styles.tableColumn20pct]}>    		
										<Subheading style={{alignSelf:"flex-start"}}>Rate :</Subheading>
										</View>
										<View style={[styles.tableColumn60pct]}>
										<Paragraph>3.10%</Paragraph>
										</View>
									</View>
								</View>
								<FAB
									style={styles.fab}
									small
									icon="bell"
									color={"#ffffff"}
									onPress={() => //console.log('Pressed')} />
							</Surface>
							<View style={{width:20}}/>
							<Surface style={styles.surface}>
								<Headline style={{alignSelf:"flex-start"}}>Instant Mortgages</Headline>
								<View style={styles.hr}/>
								<View style={{height:120}}>
									<View style={styles.tableRow}>
										<View style={[styles.tableColumn20pct]}>    		
										<Subheading style={{alignSelf:"flex-start"}}>Product :</Subheading>
										</View>
										<View style={[styles.tableColumn60pct]}>
										<Paragraph>ANZ Breakfree</Paragraph>
										</View>
									</View>
									<View style={styles.tableRow}>
										<View style={[styles.tableColumn20pct]}>    		
										<Subheading style={{alignSelf:"flex-start"}}>Rate :</Subheading>
										</View>
										<View style={[styles.tableColumn60pct]}>
										<Paragraph>3.10%</Paragraph>
										</View>
									</View>
									<View style={styles.tableRow}>
										<View style={[styles.tableColumn20pct]}>    		
										<Subheading style={{alignSelf:"flex-start"}}>Term:</Subheading>
										</View>
										<View style={[styles.tableColumn60pct]}>
										<Paragraph>24 months</Paragraph>
										</View>
									</View>
								</View>
								<View style={styles.space}/>
							</Surface>				
							<View style={{width:100}}/>

						</ScrollView>
					</List.Accordion>
					<View style={styles.hr} />
					<List.Accordion description={CONDITIONALLY_APPROVED_BANNER} id="2" 
					left={props => <Chip icon="bank">{this.props.numConditionallyApproved}</Chip>}>
						<ScrollView horizontal={true}  showsHorizontalScrollIndicator={false} style={{padding:20}}>
							<Surface style={styles.surface}>
								<Headline style={{alignSelf:"flex-start"}}>Instant Mortgages</Headline>
								<View style={styles.hr}/>
								<View style={{height:120}}>
									<View style={styles.tableRow}>
										<View style={[styles.tableColumn20pct]}>    		
										<Subheading style={{alignSelf:"flex-start"}}>Product :</Subheading>
										</View>
										<View style={[styles.tableColumn60pct]}>
										<Paragraph>ANZ Breakfree</Paragraph>
										</View>
									</View>
									<View style={styles.tableRow}>
										<View style={[styles.tableColumn20pct]}>    		
										<Subheading style={{alignSelf:"flex-start"}}>Rate :</Subheading>
										</View>
										<View style={[styles.tableColumn60pct]}>
										<Paragraph>3.10%</Paragraph>
										</View>
									</View>
									<View style={styles.tableRow}>
										<View style={[styles.tableColumn20pct]}>    		
										<Subheading style={{alignSelf:"flex-start"}}>Term:</Subheading>
										</View>
										<View style={[styles.tableColumn60pct]}>
										<Paragraph>24 months</Paragraph>
										</View>
									</View>
								</View>
								<FAB
									style={styles.fab}
									small
									icon="bell"
									onPress={() => //console.log('Pressed')} />
								<View style={styles.space}/>
							</Surface>				
						</ScrollView>
					</List.Accordion>
					<View style={styles.hr} />
					<List.Accordion description="Not approved" id="4" 
					left={props => <Chip icon="thumb-down">{this.props.numRejected}</Chip>}>
						<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
						</ScrollView>
					</List.Accordion>
					<View style={styles.hr} />
					<List.Accordion description="Recently expired" id="3" 
					left={props => <Chip icon="lock-clock">{this.props.numExpired}</Chip>}>
						<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
						</ScrollView>
					</List.Accordion>
				</List.AccordionGroup>
				<View style={styles.hr} />
			</View>
        )
    }
}

const mapStateToProps = ({ dealsReducer }) => {
  const { numUnderAssessment, numConditionallyApproved, numRejected, numExpired } = dealsReducer ;
  return { numUnderAssessment, numConditionallyApproved, numRejected, numExpired };
};

export default connect(mapStateToProps, { closeDeals })(DealStatusPerspective);