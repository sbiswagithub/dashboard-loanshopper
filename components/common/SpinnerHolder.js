import React, { Component } from "react";
import { View } from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { usePromiseTracker } from 'react-promise-tracker';

import ErrorDialog from '../ErrorDialog'
import getStyleSheet from '../../styles/styles';  

function ShowSpinner(props) {
	const styles = getStyleSheet();
    const { promiseInProgress } = usePromiseTracker();
   
	  return (
    	<View>
			
	      	<Spinner 
	      		visible={promiseInProgress} 
	      		textContent={'One moment please...'} 
	      		textStyle={styles.textMediumBoldWhite} />

			{!promiseInProgress && props.showError ? <ErrorDialog /> : null}
			
		</View>
	  );
	}

class SpinnerHolder extends Component {

	constructor(props) {
        super(props);
    }

    render () {
    	return (
    	<View>
			<ShowSpinner showError={this.props.error.showDialog === true} />
    	</View>
        )
    }
}

const mapStateToProps = ({ authReducer }) => {
  	const { error } = authReducer;
	return { error };
};

export default connect(mapStateToProps, {  })(SpinnerHolder);