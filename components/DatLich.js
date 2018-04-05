import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid,
    TouchableWithoutFeedback,
    TextInput,
    AsyncStorage,
    ScrollView
} from 'react-native';
import { Client, Message } from 'react-native-paho-mqtt';
import { connect } from 'react-redux';
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


export class DatLich extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: false,
            phunSuong: false,
            lamMat: false,
            gio1: '',
            phut1: '',
            phutChay1: '',
            gio2: '',
            phut2: '',
            phutChay2: '',
            gio3: '',
            phut3: '',
            phutChay3: '',
            gio4: '',
            phut4: '',
            phutChay4: '',
            gio5: '',
            phut5: '',
            phutChay5: '',
            allowSync: true
        }
    }

    componentDidMount() {
        client.on('connectionLost', (responseObject) => {
            if (responseObject.errorCode !== 0) {
                this.setState({
                    connect: false
                })
            }
        });
        client.connect(options).then(() => {
            this.setState({
                connect: true
            })
        }).then(() => {
            console.log('Connected');
        }).catch((responseObject) => {
            if (responseObject.errorCode !== 0) {
                this.setState({
                    connect: false
                })
            }
        });
    }

    componentDidUpdate() {
        client.subscribe(this.props.id);
    }

    phunSuong = () => {
        this.setState({ phunSuong: true, lamMat: false, allowSync: true });
    }

    lamMat = () => {
        this.setState({ phunSuong: false, lamMat: true, allowSync: true });
    }

    datLich = () => {
        var lich = {
            lich: [
                [this.state.gio1, this.state.phut1, this.state.phutChay1],
                [this.state.gio2, this.state.phut2, this.state.phutChay2],
                [this.state.gio3, this.state.phut3, this.state.phutChay3],
                [this.state.gio4, this.state.phut4, this.state.phutChay4],
                [this.state.gio5, this.state.phut5, this.state.phutChay5]
            ],
            phunSuong: this.state.phunSuong,
            lamMat: this.state.lamMat,
        }

        var lichSEND = {
            lich: [
                [parseFloat(this.state.gio1), parseFloat(this.state.phut1), parseFloat(this.state.phutChay1)],
                [parseFloat(this.state.gio2), parseFloat(this.state.phut2), parseFloat(this.state.phutChay2)],
                [parseFloat(this.state.gio3), parseFloat(this.state.phut3), parseFloat(this.state.phutChay3)],
                [parseFloat(this.state.gio4), parseFloat(this.state.phut4), parseFloat(this.state.phutChay4)],
                [parseFloat(this.state.gio5), parseFloat(this.state.phut5), parseFloat(this.state.phutChay5)]
            ],
            phunSuong: this.state.phunSuong,
            lamMat: this.state.lamMat,
        }

        if (this.state.connect === true) {
            const datLich = new Message(JSON.stringify(lichSEND));
            datLich.destinationName = this.props.id;
            client.send(datLich);
            ToastAndroid.showWithGravity(
                'Hoàn thành !',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            if (this.state.phunSuong === true) {
                AsyncStorage.setItem('lps', JSON.stringify(lich));
            }
            if (this.state.lamMat === true) {
                AsyncStorage.setItem('llm', JSON.stringify(lich));
            }
        }
    }
    render() {
        if (this.state.phunSuong === true && this.state.allowSync === true) {
            AsyncStorage.getItem('lps').then(data1 => {
                if (data1) {
                    let json = JSON.parse(data1);
                    let data = json.lich;
                    this.setState({
                        phunSuong: true,
                        lamMat: false,
                        gio1: data[0][0],
                        phut1: data[0][1],
                        phutChay1: data[0][2],
                        gio2: data[1][0],
                        phut2: data[1][1],
                        phutChay2: data[1][2],
                        gio3: data[2][0],
                        phut3: data[2][1],
                        phutChay3: data[2][2],
                        gio4: data[3][0],
                        phut4: data[3][1],
                        phutChay4: data[3][2],
                        gio5: data[4][0],
                        phut5: data[4][1],
                        phutChay5: data[4][2],
                        allowSync: false
                    })
                }
            })
        }

        if (this.state.lamMat === true && this.state.allowSync === true) {
            AsyncStorage.getItem('llm').then(data1 => {
                if (data1) {
                    let json = JSON.parse(data1);
                    let data = json.lich;
                    this.setState({
                        phunSuong: false,
                        lamMat: true,
                        gio1: data[0][0],
                        phut1: data[0][1],
                        phutChay1: data[0][2],
                        gio2: data[1][0],
                        phut2: data[1][1],
                        phutChay2: data[1][2],
                        gio3: data[2][0],
                        phut3: data[2][1],
                        phutChay3: data[2][2],
                        gio4: data[3][0],
                        phut4: data[3][1],
                        phutChay4: data[3][2],
                        gio5: data[4][0],
                        phut5: data[4][1],
                        phutChay5: data[4][2],
                        allowSync: false
                    })
                }
            })
        }

        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {this.state.connect === true ?
                        <View style={{ flex: 2, marginTop: 20 }}>
                            <TouchableWithoutFeedback onPress={() => this.phunSuong()}>
                                <View style={{
                                    flex: 1,
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor: '#460259',
                                    borderStyle: 'solid',
                                    borderLeftWidth: 5,
                                    borderBottomWidth: 5,
                                    borderRightWidth: 5,
                                    borderTopWidth: 5,
                                    marginLeft: 50,
                                    marginRight: 50,
                                    height: 60,
                                    backgroundColor: this.state.phunSuong === true ? '#4c063f' : 'white'
                                }}>
                                    <Text style={{
                                        fontSize: 25,
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        color: this.state.phunSuong === true ? 'white' : '#460259',
                                        fontWeight: 'bold'
                                    }}>Phun Sương</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View> :
                        <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 250 }}>
                            <Text style={{ fontSize: 30, textAlign: 'center', color: '#A81057' }}>Chưa kết nối tới server</Text>
                        </View>}
                    {this.state.connect === true ?
                        <View style={{ flex: 2, marginTop: 20 }}>
                            <TouchableWithoutFeedback onPress={() => this.lamMat()}>
                                <View style={{
                                    flex: 1,
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor: '#840934',
                                    borderStyle: 'solid',
                                    borderLeftWidth: 5,
                                    borderBottomWidth: 5,
                                    borderRightWidth: 5,
                                    borderTopWidth: 5,
                                    marginLeft: 50,
                                    marginRight: 50,
                                    height: 60,
                                    backgroundColor: this.state.lamMat === true ? '#840934' : 'white'
                                }}>
                                    <Text style={{
                                        fontSize: 25,
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        color: this.state.lamMat === true ? 'white' : '#840934',
                                        fontWeight: 'bold'
                                    }}>Làm mát</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View> : <View></View>
                    }
                    {this.state.connect === true ?
                        <View style={{ flex: 10, flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flex: 2, flexDirection: 'column', }}>
                                <View style={styles.borderTable}>
                                    <Text style={{ fontSize: 20, textAlign: 'center' }}>
                                        Thời điểm
                                    </Text>
                                </View>
                                {/*ROW 1*/}
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40 }}
                                            onChangeText={(gio1) => this.setState({ gio1 })}
                                            value={this.state.gio1}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40 }}
                                            onChangeText={(phut1) => this.setState({ phut1 })}
                                            value={this.state.phut1}
                                        />
                                    </View>
                                </View>
                                {/*ROW 2*/}
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40 }}
                                            onChangeText={(gio2) => this.setState({ gio2 })}
                                            value={this.state.gio2}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40 }}
                                            onChangeText={(phut2) => this.setState({ phut2 })}
                                            value={this.state.phut2}
                                        />
                                    </View>
                                </View>
                                {/*ROW 3*/}
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40 }}
                                            onChangeText={(gio3) => this.setState({ gio3 })}
                                            value={this.state.gio3}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40 }}
                                            onChangeText={(phut3) => this.setState({ phut3 })}
                                            value={this.state.phut3}
                                        />
                                    </View>
                                </View>
                                {/*ROW 4*/}
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40 }}
                                            onChangeText={(gio4) => this.setState({ gio4 })}
                                            value={this.state.gio4}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40 }}
                                            onChangeText={(phut4) => this.setState({ phut4 })}
                                            value={this.state.phut4}
                                        />
                                    </View>
                                </View>
                                {/*ROW 5*/}
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40 }}
                                            onChangeText={(gio5) => this.setState({ gio5 })}
                                            value={this.state.gio5}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40 }}
                                            onChangeText={(phut5) => this.setState({ phut5 })}
                                            value={this.state.phut5}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <View style={styles.borderTable}>
                                    <Text style={{ fontSize: 20, textAlign: 'center' }}>
                                        Thời gian
                            </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40 }}
                                            onChangeText={(phutChay1) => this.setState({ phutChay1 })}
                                            value={this.state.phutChay1}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40 }}
                                            onChangeText={(phutChay2) => this.setState({ phutChay2 })}
                                            value={this.state.phutChay2}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40 }}
                                            onChangeText={(phutChay3) => this.setState({ phutChay3 })}
                                            value={this.state.phutChay3}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40 }}
                                            onChangeText={(phutChay4) => this.setState({ phutChay4 })}
                                            value={this.state.phutChay4}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40 }}
                                            onChangeText={(phutChay5) => this.setState({ phutChay5 })}
                                            value={this.state.phutChay5}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View> : <View></View>
                    }
                    {this.state.connect === true ?
                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <TouchableWithoutFeedback onPress={() => this.datLich()}>
                                <View style={{
                                    flex: 1,
                                    height: 60,
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    borderColor: '#170559',
                                    borderStyle: 'solid',
                                    borderLeftWidth: 2,
                                    borderBottomWidth: 4,
                                    borderRightWidth: 4,
                                    borderTopWidth: 4,
                                }}>
                                    <Text style={{ fontSize: 30, textAlign: 'center', color: '#170559', fontWeight: 'bold' }}>Đặt lịch</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        : <View></View>
                    }
                </View >
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    borderTable: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 10,
        borderColor: 'black',
        borderStyle: 'solid',
        borderLeftWidth: 1,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
    }
});



const mapStateToProps = state => {
    return {
        id: state.id,
    }
}


export default connect(mapStateToProps, null)(DatLich);
