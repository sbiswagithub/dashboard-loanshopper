import React, { Component, useState } from "react";
import { View, Text, TextInput } from 'react-native';
import { Chip, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import Moment from 'moment';
import getStyleSheet from '../../styles/styles';
import { employmentExperienceRemoved, employmentExperienceAdded, employmentExperienceUpdated } from '../../actions';
import {  } from '../../constants/disclosure';
import {  } from '../../constants/banners';
import EmploymentRecord from './EmploymentRecord'
import { BACKGROUND_LIGHT_GRAY, LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE } from "../../constants/colors";

const styles = getStyleSheet();

class EmploymentHistory extends Component {

	state = { error : undefined, isStartDateError : undefined, isEndDateError : undefined }

	constructor(props) {
        super(props);
	}

	checkStartDate(period) {
		if (new RegExp('\\d+\/\\d{4}').test(period)) {
			const date = Moment(period,'MM/YYYY')
			this.setState(!date.isValid() ?
				{...this.state, error : 'Invalid period', isStartDateError : true} :
				{...this.state, error : undefined, isStartDateError : undefined}
			)
		} else {
			this.setState({...this.state, error : 'Incorrect format', isStartDateError : true})
		}
	}
	checkEndDate(period) {
		if (new RegExp('\\d+\/\\d{4}').test(period)) {
			const date = Moment(period,'MM/YYYY')
			this.setState(!date.isValid() ?
				{...this.state, error : 'Invalid period', isEndDateError : true} :
				{...this.state, error : undefined, isEndDateError : undefined}
			)
		} else {
			this.setState({...this.state, error : 'Incorrect format', isEndDateError : true})
		}
	}

    render () {
		const employmentExperience = this.props.employmentHistory[this.props.employmentHistory.length - 1] 
		const minDetailsSet = employmentExperience?.employerName != undefined && 
							employmentExperience?.position != undefined && 
							employmentExperience?.startDate != undefined &&
							(employmentExperience?.endDate != undefined || employmentExperience?.isCurrent == true) 

		const employmentRecords = []
		this.props.employmentHistory.map(e => employmentRecords.push(e))
    	return (
    		<View style={{ flex: 0.9, flexDirection:'column'}}>
        		<Text style={[styles.textMediumBoldGray, {alignSelf:'center'}]}>Employment history</Text>
				<View style={styles.space}/>
				<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>Provide last 2 years employment details</Text>
				<View style={styles.space}/>

				<View style={{ flexDirection:'row'}}>
				<View style={{  flexDirection:'column', flexGrow : 1}}>
					<View style={{ flexDirection:'row', padding:'1%', alignContent:"stretch", alignItems:"stretch", justifyContent:"space-between"}}>
						<TextInput style={[styles.whiteBgCentredTextInput, { width: '45%', marginBottom: 3, }]} 
								placeholder={'Employer name'}
								value={employmentExperience?.employerName == undefined ? '' : employmentExperience.employerName}
								onChangeText={text => this.props.employmentExperienceUpdated({employerName : text})}  />
						<TextInput style={[styles.whiteBgCentredTextInput,  { width: '45%', marginBottom: 3, }]} 
								placeholder={'Position'}
								value={employmentExperience?.position == undefined ? '' : employmentExperience.position}
								onChangeText={text => this.props.employmentExperienceUpdated({position : text})}  />
					</View>
					<View style={styles.space}/>
					<View style={{ flexDirection:'row', padding:'1%', alignContent:"stretch", alignItems:"stretch", justifyContent:"space-between"}}>
						<TextInput style={[styles.whiteBgCentredTextInput, { width: '45%', marginBottom: 3, }]} 
								placeholder={'Employer contact'}
								value={employmentExperience?.employerContact == undefined ? '' : employmentExperience.employerContact}
								onChangeText={text => this.props.employmentExperienceUpdated({employerContact : text})}  />
						<TextInput style={[styles.whiteBgCentredTextInput, { width: '45%', marginBottom: 3, }]} 
								placeholder={'Employer email'}
								value={employmentExperience?.employerEmail == undefined ? '' : employmentExperience.employerEmail}
								onChangeText={text => this.props.employmentExperienceUpdated({employerEmail : text})}  />
					</View>
					<View style={styles.space}/>
					<View style={{ flexDirection:'row', padding:'1%', alignContent:"stretch", alignItems:"stretch", justifyContent:"space-between"}}>
						<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry]} 
								placeholder={'Start MM/YYYY'}
								value={employmentExperience?.startDate == undefined ? '' : employmentExperience.startDate}
								onChangeText={text => this.props.employmentExperienceUpdated({startDate : text})} 
								onBlur={() => this.checkStartDate(employmentExperience.startDate)} />
						{this.state.isStartDateError ? <Text style={{color:'red', fontSize:15}} >{this.state.error}</Text> : null}
						{!employmentExperience?.isCurrent || !employmentExperience.isCurrent ? 
						<View>
							<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry]} 
									placeholder={'End MM/YYYY'} 
								value={employmentExperience?.endDate == undefined ? '' : employmentExperience.endDate}
									onChangeText={text => this.props.employmentExperienceUpdated({endDate : text})}
									onBlur={() => {
										if (employmentExperience?.endDate != undefined && !employmentExperience.isCurrent)
											this.checkEndDate(employmentExperience.endDate)
									}}   />
						{this.state.isEndDateError ? <Text style={{color:'red', fontSize:15}} >{this.state.error}</Text> : null}
						</View>
									: null }
						<Chip style={styles.chipNormal } textStyle={styles.textSmallBoldWhite } selected={employmentExperience?.isCurrent ? employmentExperience.isCurrent : false} 
							onPress={() => {
								this.props.employmentExperienceUpdated({isCurrent : employmentExperience?.isCurrent ? !employmentExperience.isCurrent : true})
							}}>Currently working here</Chip>
					</View>
					<View style={{ flexDirection:'row-reverse', padding:'1%', }}>
						<Icon.Button name="plus" size={10} borderRadius={5} backgroundColor={minDetailsSet ? LOGO_BRIGHT_BLUE : BACKGROUND_LIGHT_GRAY } iconStyle={{margin:1}} 
							disabled={!minDetailsSet}
							onPressIn={this.props.employmentExperienceAdded} >Add more</Icon.Button>
					</View>					
				</View>


				{employmentRecords.length == 0 ? 
				<View style={styles.space}/> : 
				<View style={{  flexDirection:'column', width:'35%'}}>
					{employmentRecords.map(e => (
					<>
					{e.employerName == undefined || 
						e.position == undefined || 
						e.startDate == undefined || 
						(e.endDate == undefined && (e.isCurrent == false || e.isCurrent == undefined)) ? null : 
						<EmploymentRecord {...e} onRemove={() => {
							this.props.employmentExperienceRemoved(e)
							this.setState({...this.state, error : undefined, isEndDateError : undefined, isStartDateError : undefined})
						}}  />}
					<View style={styles.space}/>
					</>
					))}
				</View> 
				}

				</View>
    		</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { employmentHistory, } = disclosureReducer;
  return { employmentHistory, };
};

export default connect(mapStateToProps, { employmentExperienceRemoved, employmentExperienceAdded, employmentExperienceUpdated })(EmploymentHistory);