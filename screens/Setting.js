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
import DatLich from '../components/DatLich';

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: false,
        }
    }
    render() {
        return (
            <DatLich />
        );
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
