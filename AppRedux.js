import React from 'react';
import { StyleSheet, Text, View, StatusBar, AsyncStorage } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { TabNavigator } from 'react-navigation';
import Home from './screens/Home';
import Setting from './screens/Setting';
import AddBar from './components/AddBar';
import SlashScreen from './screens/SlashScreen';
import ScanScreen from './screens/ScanScreen';
import AddName from './components/AddName';
import { connect } from 'react-redux';
import * as act from './actions/index';
require('events').EventEmitter.prototype._maxListeners = 0;

export const Navigator = TabNavigator({
	'Trang Chủ': { screen: Home },
	'Cài đặt': { screen: Setting },
}, {
		tabBarOptions: {
			style: {
				backgroundColor: '#1F9E28',
				borderTopWidth: 1,
				borderTopColor: 'white',
			},
			indicatorStyle: {
				backgroundColor: 'white',
			},
			labelStyle: {
				fontWeight: 'bold'
			}
		},
	});


export class AppRedux extends React.Component {
	componentWillMount() {
		this.props.getMachineID();
		this.props.status_page('SLASH')
	}

	render() {
		var { machine, status } = this.props;
		return (
			<View style={{ flex: 1, flexDirection: 'column' }}>
				<StatusBar
					hidden={true}
				/>
				<View style={{ height: 35 }}>
					<AddBar onPress={this.onPress} />
				</View>
				<View style={{ flex: 1, marginTop: -1 }}>
					{status === 'SLASH' ? <SlashScreen /> : <View></View>}
					{status === 'SCAN' ? <ScanScreen /> : <View></View>}
					{status === 'CONTROL' ? <Navigator /> : <View></View>}
					{status === 'NAME' ? <AddName onAddName={this.onAddName} /> : <View></View>}
				</View>
			</View>
		);
	}

	onAddName = (name) => {
		AsyncStorage.getItem('name').then(names => {
			let tmp = JSON.parse(names) || [];
			tmp.push(name);
			AsyncStorage.setItem('name', JSON.stringify(tmp));
		})

		this.setState({
			onAddName: false
		})
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});


const mapStateToProps = state => {
	console.log(state);
	return {
		machine: state.machine,
		scanned: state.scanned,
		id: state.id,
		status: state.status
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		getMachineID: () => {
			dispatch(act.getMachineID());
		},
		status_page: (status) => {
			dispatch(act.status_page(status));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRedux);

