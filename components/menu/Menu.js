import React, { Component } from "react";
import { Linking, View } from 'react-native';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';
import { connect } from 'react-redux';
import { trackPromise, } from 'react-promise-tracker';
import * as RootNavigation from '../../actions/RootNavigation.js';

import Header from './Header';
import Home from '../home/Home';
import ResetPassword from '../ResetPassword'
import DocumentLanding from "../documents/DocumentLanding";
import { onRegistrationInProgress, handleFetchError, onLogout,getMe, getBorrower, authenticatedBorrower, loadBorrowerDetails, 
	fetchClientConnections, showResetPassword } from "../../actions";

import { HOME, SHARED_DOCUMENTS, ABOUT_US, T_AND_C, PRIVACY_POLICY, LOGOUT } from '../../constants/banners';
import { about_us_url, privacy_policy_url, t_and_c_url, color_active, color_inactive } from '../../constants/home';

const Drawer = createDrawerNavigator();
function DrawerActionContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<DrawerItem label={T_AND_C} onPress={() => Linking.openURL(t_and_c_url)} activeTintColor={color_active} inactiveTintColor={color_inactive} />
			<DrawerItem label={PRIVACY_POLICY} onPress={() => Linking.openURL(privacy_policy_url)} activeTintColor={color_active} inactiveTintColor={color_inactive} />
			<DrawerItem label={LOGOUT} onPress={() => {
				props.onLogout()
				RootNavigation.navigate('Landing')}} 
				activeTintColor={color_active} inactiveTintColor={color_inactive} />
		</DrawerContentScrollView>
	);
}


class Menu extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
		<Drawer.Navigator 
			screenListeners={({ navigation }) => ({
				state: (e) => {
				// Do something with the state
				//console.log('state changed', e.data);

				if (e.data.state.index == 1) {
					// In Change Password state
					const drawer = e.data.state.history.find(o => o.type == 'drawer')
					if (drawer == undefined || drawer.status == 'closed')
						this.props.showResetPassword()
					}
				},
			})}		
			drawerContent={props => <DrawerActionContent {...props} {...this.props} />}
			initialRouteName={HOME}
			screenOptions={{
				overlayColor: color_active,
				drawerType: 'front',
				drawerStyle: { backgroundColor: '#1f215e' },
				drawerActiveTintColor: color_active,
				itemStyle: { marginVertical: 30 },
				drawerInactiveTintColor: color_inactive,
				headerShown: 'true',
				header: ({ navigation, route, options }) => {
					const title = getHeaderTitle(options, route.name);

					return (
						<Header title={title} style={options.headerStyle}
							onTogglePress={navigation.toggleDrawer} />
					);
				}
			}}
			>
				<Drawer.Screen
					name={HOME}
					component={Home}
					options={{ drawerLabel: HOME }}
				/>

			</Drawer.Navigator>
		);
	}
}

const mapStateToProps = ({ authReducer, homeReducer }) => {
	const {  } = authReducer;
	const {  } = homeReducer;
	return {  };
};

export default connect(mapStateToProps, {
	onLogout, onRegistrationInProgress,  handleFetchError, getMe,getBorrower, authenticatedBorrower, loadBorrowerDetails, fetchClientConnections, showResetPassword })(Menu);