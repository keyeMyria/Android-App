import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid
} from 'react-native';
import { Client, Message } from 'react-native-paho-mqtt';
import NhietDo from '../components/NhietDo';
import CaiDat from '../components/CaiDat';
import AddBar from '../components/AddBar';

export default class Home extends Component {
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
        console.log("Delete");
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
