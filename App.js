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
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import appReducers from './reducers/index';
import thunk from 'redux-thunk';

const store = createStore(
	appReducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunk)
);

export const Navigator = TabNavigator({
	'Trang Chủ': { screen: Home },
	'Cài đặt': { screen: Setting },
});


export default class App extends React.Component {
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

	componentDidMount() {
		try {
			AsyncStorage.getItem('device').then((data) => {
				if (data !== null) {
					this.setState({
						machine: JSON.parse(data)
					})
				}
			})
		} catch (error) {
			console.log("Having error when get data");
		}
	}

	render() {
		var { machine } = this.state;
		return (
			<Provider store={store}>
				<View style={{ flex: 1, flexDirection: 'column' }}>
					<StatusBar
						hidden={true}
					/>
					<View style={{ height: 35 }}>
						<AddBar onPressAdd={this.onPressAdd} machine={machine} onPress={this.onPress} />
					</View>
					<View style={{ flex: 1 }}>
						{this.state.onScan === true ? <ScanScreen handleBarCodeRead={this.handleBarCodeRead} /> : <View></View>}
						{this.state.onControl === true ? <Navigator /> : <View></View>}
						{this.state.SlashScreen === true ? <SlashScreen /> : <View></View>}
						{this.state.onAddName === true ? <AddName onAddName={this.onAddName} /> : <View></View>}
					</View>
				</View>
			</Provider>
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
		console.log(data);
		this.setState({
			onControl: true,
			onScan: false,
			onSlashScreen: false
		})
	}

	onAddName = () => {
		this.setState({
			onAddName: false
		})
	}

	handleBarCodeRead = (data) => {
		var tmp = this.state.machine;
		tmp.push(data.data);
		if (data.data) {
			if (data.type === 256) {
				AsyncStorage.setItem('device', JSON.stringify(tmp));
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
