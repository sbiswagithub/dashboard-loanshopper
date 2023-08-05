import React, { Component } from "react";
import { Linking, } from 'react-native';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';
import { connect } from 'react-redux';
import * as RootNavigation from '../../actions/RootNavigation.js';

import Header from './Header';
import Home from '../home/Home';
import ClientConnections from '../clientConnections';
import { onRegistrationInProgress, handleFetchError, onLogout,getMe, getBorrower, authenticatedBorrower, loadBorrowerDetails, 
	fetchClientConnections, showResetPassword } from "../../actions";

import { HOME, T_AND_C, PRIVACY_POLICY, LOGOUT } from '../../constants/banners';
import { privacy_policy_url, t_and_c_url, color_active, color_inactive } from '../../constants/home';

const Drawer = createDrawerNavigator();
function DrawerActionContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItem label={"Home"} onPress={() => RootNavigation.navigate('Home')} activeTintColor={color_active} inactiveTintColor={color_inactive} />
			<DrawerItem label={"My connections"} onPress={() => RootNavigation.navigate('ClientConnections')} activeTintColor={color_active} inactiveTintColor={color_inactive} />
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
				console.log('state changed', e.data);
				if (e.data.state.index == 1) {
					// In Change Password state
					const drawer = e.data.state.history.find(o => o.type == 'drawer')
					if (drawer == undefined || drawer.status == 'closed')
						this.props.showResetPassword()
					}
				},
			})}		
			backBehavior={"none"}
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
					options={{ drawerLabel: HOME }} />
				<Drawer.Screen
					name={"ClientConnections"}
					component={ClientConnections} />
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