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
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Card } from 'native-base';
import * as act from '../actions/index';
require('events').EventEmitter.prototype._maxListeners = 0;

export const myStorage = {
    setItem: (key, item) => {
        myStorage[key] = item;
    },
    getItem: (key) => myStorage[key],
    removeItem: (key) => {
        delete myStorage[key];
    },
};

export const client = new Client({ uri: 'ws://solavo.ddns.net:8883/', clientId: "android_" + parseInt(Math.random() * 100, 10), storage: myStorage });
var options = {
    useSSL: false,
    userName: "sammy",
    password: "123456789",
}


export class NhietDo extends Component {
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

    componentDidMount() {
        /*
        client.on('connectionLost', (responseObject) => {
            if (responseObject.errorCode !== 0) {
                this.setState({
                    connect: false
                })
            }
            console.log(responseObject);
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
            });
            client.subscribe(this.props.id);
            const messcon = new Message(JSON.stringify({ connect: true }));
            messcon.destinationName = this.props.id;
            client.send(messcon);
        }).then(() => {
            console.log('Connected');
        }).catch((responseObject) => {
            if (responseObject.errorCode !== 0) {
                this.setState({
                    connect: false
                })
            }
        });
        */
    }

    /*
    componentWillReceiveProps() {
        setTimeout(() => {
            client.subscribe(this.props.id);
            const messcon = new Message(JSON.stringify({ connect: true }));
            messcon.destinationName = this.props.id;
            client.send(messcon);
        }, 100)
    }
*/

    render() {
        console.log(this.props.id);
        return (
            <Card style={{ flex: 2, marginBottom: 10, marginTop: -10, paddingTop: 20, marginLeft: 20, marginRight: 20, paddingBottom: 20 }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#170559',
                    borderStyle: 'solid',
                    borderBottomWidth: 2,
                    borderBottomColor: this.state.connect === true ? 'green' : 'white',
                    paddingBottom: 10
                }} key={"Block1"}>
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignSelf: 'center', marginLeft: 20 }}>
                        {this.state.connect === true ? <FontAwesome name="signal" size={50} color="green" /> : <MaterialIcons name="signal-cellular-off" size={50} color="green" />}
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', marginLeft: 10 }}>
                        {this.state.connect === true ? <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Tốt</Text> : <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>Xấu</Text>}
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', marginLeft: 10 }}>
                        {this.state.connect === true ? <Text style={{ fontSize: 22, fontWeight: 'bold' }}>5ms</Text> : <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}></Text>}
                    </View>
                </View>
                {this.state.connect === true ?
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 60,
                                    textAlign: 'center',
                                    color: 'green'
                                }}>
                                    {this.state.nhietdo}°C
                                </Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 22,
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    Nhiệt độ
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: 60, textAlign: 'center', color: 'green' }}>
                                    {this.state.doam}%
                            </Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 22,
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    Độ ẩm
                                </Text>
                            </View>
                        </View>
                    </View> : <View></View>
                }
            </Card>
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



const mapStateToProps = state => {
    return {
        id: state.id,
    }
}


export default connect(mapStateToProps, null)(NhietDo);

