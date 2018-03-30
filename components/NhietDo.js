/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

//Set up an in-memory alternative to global localStorage
export const myStorage = {
    setItem: (key, item) => {
        myStorage[key] = item;
    },
    getItem: (key) => myStorage[key],
    removeItem: (key) => {
        delete myStorage[key];
    },
};

// Create a client instance
export const client = new Client({ uri: 'wss://m13.cloudmqtt.com:34250/', clientId: "android_" + parseInt(Math.random() * 100, 10), storage: myStorage });
var options = {
    useSSL: true,
    userName: "jepjknnb",
    password: "B9Io8J5H88fP",
}


export default class NhietDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: false,
            nhietdo: 0,
            doam: 0,
            onSuong: false,
            onBom: false,
            giaySuong: 0,
            phutSuong: 0,
            giayBom: 0,
            phutBom: 0
        }
    }

    componentWillMount() {

        client.on('connectionLost', (responseObject) => {
            if (responseObject.errorCode !== 0) {
                this.setState({
                    connect: false
                })
            }
        });

        client.on('messageReceived', (message) => {
            var data = JSON.parse(message.payloadString);
            if (data.nhietdo !== undefined && data.doam !== undefined) {
                this.setState({
                    nhietdo: data.nhietdo,
                    doam: data.doam
                })
            }
        });

        client.connect(options).then(() => {
            this.setState({
                connect: true
            })
            const messcon = new Message(JSON.stringify({ connect: true }));
            messcon.destinationName = 'connect';
            client.send(messcon);
        }).then(() => {
            return client.subscribe('data');
        }).catch((responseObject) => {
            if (responseObject.errorCode !== 0) {
                this.setState({
                    connect: false
                })
            }
        });
    }


    render() {
        return (
            <View style={{ flex: 2, marginBottom: 50 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} key={"Block1"}>
                    <Text style={{ fontSize: 25 }}>
                        {this.state.connect === true ? 'Đã kết nối tới server!' : 'Chưa kết nối tới server!'}
                    </Text>
                </View>
                {this.state.connect === true ?
                    [<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} key={"Block2"}>
                        <Text style={{ fontSize: 25 }}>
                            Nhiệt độ: {this.state.nhietdo}°C
                    </Text>
                    </View>,
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} key={"Block3"}>
                        <Text style={{ fontSize: 25, marginLeft: -30 }}>
                            Độ ẩm: {this.state.doam}%
                    </Text>
                    </View>] :
                    <View></View>
                }
            </View>
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
