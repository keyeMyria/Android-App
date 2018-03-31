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

export const Navigator = TabNavigator({
	'Trang Chủ': { screen: Home },
	'Cài đặt': { screen: Setting },
});


export class AppRedux extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			onScan: false,
			onControl: false,
			onSlashScreen: true,
			onAddName: false,
			machine: []
		}
	}

	componentWillMount() {
		this.props.getMachineID();
	}


	render() {
		var { machine } = this.props;
		return (
			<View style={{ flex: 1, flexDirection: 'column' }}>
				<StatusBar
					hidden={true}
				/>
				<View style={{ height: 35 }}>
					<AddBar onPressAdd={this.onPressAdd} onPress={this.onPress} />
				</View>
				<View style={{ flex: 1 }}>
					{this.state.onScan === true ? <ScanScreen handleBarCodeRead={this.handleBarCodeRead} /> : <View></View>}
					{this.state.onControl === true ? <Navigator /> : <View></View>}
					{this.state.SlashScreen === true ? <SlashScreen /> : <View></View>}
					{this.state.onAddName === true ? <AddName onAddName={this.onAddName} /> : <View></View>}
				</View>
			</View>
		);
	}

	onPressAdd = () => {
		this.setState({
			onScan: true,
			onControl: false,
			onSlashScreen: false
		})
	}

	onPress = (data) => {
		this.setState({
			onControl: true,
			onScan: false,
			onSlashScreen: false
		})
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

	handleBarCodeRead = (data) => {
		var tmp = this.props.machine;
		tmp.push(data.data);
		if (data.data) {
			if (data.type === 256) {
				AsyncStorage.setItem('machine', JSON.stringify(tmp));
				this.setState({
					onScan: false,
					machine: tmp,
					onAddName: true
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


const mapStateToProps = state => {
	return {
		machine: state.machine,
		scanned: state.scanned,
		id: state.id
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		getMachineID: () => {
			dispatch(act.getMachineID());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRedux);

