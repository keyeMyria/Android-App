import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid,
    AsyncStorage
} from 'react-native';
import { Client, Message } from 'react-native-paho-mqtt';
import NhietDo from '../components/NhietDo';
import CaiDat from '../components/CaiDat';
import AddBar from '../components/AddBar';
import { connect } from 'react-redux';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: false,
        }
    }
    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 50, justifyContent: 'center' }}>
                        SOLAVO
                    </Text>
                </View>
                <NhietDo />
                <CaiDat />
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        onPress={() => this.onDelete()}
                        title="Delete"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>
        );
    }
    onDelete = () => {
        AsyncStorage.getItem('device').then(data => {
            let tmp = JSON.parse(data);
            let index = tmp.indexOf(this.props.currentID);
            tmp.splice(index, 1);
            AsyncStorage.setItem('device', JSON.stringify(tmp));
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

const mapStateToProps = state => {
    return {
        currentID: state.id
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


