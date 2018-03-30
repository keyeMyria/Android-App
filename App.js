import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { TabNavigator } from 'react-navigation';
import Home from './screens/Home';
import Setting from './screens/Setting';
import AddBar from './components/AddBar';
import SlashScreen from './screens/SlashScreen';
import ScanScreen from './screens/ScanScreen';

export const Navigator = TabNavigator({
	'Trang Chủ': { screen: Home },
	'Cài đặt': { screen: Setting },
});

export const machine = ['SOL_1', 'SOL_2'];

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			onScan: false
		}
	}
	render() {
		return (
			<View style={{ flex: 1, flexDirection: 'column' }}>
				<StatusBar
					hidden={true}
				/>
				<View style={{ height: 35 }}>
					<AddBar onPressAdd={this.onPressAdd} machine={machine} />
				</View>
				<View style={{ flex: 1 }}>
					{this.state.onScan === true ? <ScanScreen handleBarCodeRead={this.handleBarCodeRead} /> : <SlashScreen />}
				</View>
			</View>
		);
	}

	onPressAdd = () => {
		this.setState({
			onScan: true
		})
	}

	handleBarCodeRead = (data) => {
		if (data.data) {
			if (data.type === 256) {
				this.setState({
					onScan: false
				})
			}
		}
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
