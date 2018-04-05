import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid,
    AppRegistry
} from 'react-native';
import { Client, Message } from 'react-native-paho-mqtt';
import { connect } from 'react-redux';


export const myStorage = {
    setItem: (key, item) => {
        myStorage[key] = item;
    },
    getItem: (key) => myStorage[key],
    removeItem: (key) => {
        delete myStorage[key];
    },
};


export const client = new Client({ uri: 'wss://m13.cloudmqtt.com:34250/', clientId: "android_" + parseInt(Math.random() * 100, 10), storage: myStorage });
var options = {
    useSSL: true,
    userName: "jepjknnb",
    password: "B9Io8J5H88fP",
}


export class CaiDat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: false,
            onSuong: false,
            onBom: false,
            giaySuong: 0,
            phutSuong: 0,
            giayBom: 0,
            phutBom: 0,
            statusBom: false,
            statusSuong: false
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

        client.on('messageReceived', (message) => {
            var data = JSON.parse(message.payloadString);
            if (data.statusBom !== undefined && data.statusSuong !== undefined) {
                this.setState({
                    statusBom: data.statusBom,
                    statusSuong: data.statusSuong
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

    componentWillReceiveProps() {
        setTimeout(() => {
            client.subscribe(this.props.id);
        }, 100)
    }


    render() {
        return (
            <View style={styles.containner}>
                {this.state.connect === true ?
                    [<View style={styles.borderBox} key={"Phun Suong"}>
                        <View style={{ backgroundColor: this.state.statusSuong === true ? '#220C85' : 'white', height: 30, width: 30, marginTop: 15, borderRadius: 30 }}>
                        </View>
                        <View style={styles.View}>
                            <Text style={styles.Text}>
                                Phun Sương
                            </Text>
                        </View>
                        <View style={{ flex: 1, width: 80 }}>
                            <Button
                                onPress={() => this.onSuong()}
                                title="ON"
                                color="#009999"
                                accessibilityLabel="Click to on pump"
                            />
                        </View>
                        <View style={{ flex: 1, width: 80 }}>
                            <Button
                                onPress={() => this.offSuong()}
                                title="OFF"
                                color="#990033"
                                accessibilityLabel="Click to off pump"
                            />
                        </View>
                        {this.renderTimeSuong()}
                    </View>,
                    <View style={styles.borderBox} key={"Lam Mat"}>
                        <View style={{ backgroundColor: this.state.statusBom === true ? '#220C85' : 'white', height: 30, width: 30, marginTop: 15, borderRadius: 30 }}>
                        </View>
                        <View style={styles.View}>
                            <Text style={styles.Text}>
                                Làm mát
                        </Text>
                        </View>
                        <View style={{ flex: 1, width: 80 }}>
                            <Button
                                onPress={() => this.onBom()}
                                title="ON"
                                color="#009999"
                                accessibilityLabel="Click to on pump"
                            />
                        </View>
                        <View style={{ flex: 1, width: 80 }}>
                            <Button
                                onPress={() => this.offBom()}
                                title="OFF"
                                color="#990033"
                                accessibilityLabel="Click to off pump"
                            />
                        </View>
                        {this.renderTimeBom()}
                    </View>] :
                    <View></View>
                }
            </View>
        );
    }

    renderTimeSuong = () => {
        if (this.state.onSuong === true) {
            let giaySuong = this.state.giaySuong < 10 ? `0${this.state.giaySuong}` : this.state.giaySuong;
            let phutSuong = this.state.phutSuong < 10 ? `0${this.state.phutSuong}` : this.state.phutSuong;

            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text>{`${phutSuong}:${giaySuong}`}</Text>
                </View>
            );
        } else {
            return (
                <View></View>
            );
        }
    }

    renderTimeBom = () => {
        if (this.state.onBom === true) {
            let giayBom = this.state.giayBom < 10 ? `0${this.state.giayBom}` : this.state.giayBom;
            let phutBom = this.state.phutBom < 10 ? `0${this.state.phutBom}` : this.state.phutBom;

            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text>{`${phutBom}:${giayBom}`}</Text>
                </View>
            );
        } else {
            return (
                <View></View>
            );
        }
    }


    renderBTN = (title, color, label, fun) => {
        return (
            <View style={{ flex: 1, width: 80 }}>
                <Button
                    onPress={fun}
                    title={title}
                    color={color}
                    accessibilityLabel={label}
                />
            </View>
        );
    }

    onSuong = () => {
        if (this.state.connect) {
            const message = new Message(JSON.stringify({ suong: true }));
            message.destinationName = this.props.id;
            client.send(message);
            ToastAndroid.showWithGravity(
                'Hoàn thành !',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            this.setState({
                onSuong: true,
            })
            clearInterval(this.inter);
            this.inter = setInterval(() => {
                if (this.state.giaySuong === 59) {
                    this.setState({
                        giaySuong: 0,
                        phutSuong: this.state.phutSuong + 1
                    })
                }
                this.setState({
                    giaySuong: this.state.giaySuong + 1
                })
            }, 1000);
        }
    }

    offSuong = () => {
        if (this.state.connect) {
            const message = new Message(JSON.stringify({ suong: false }));
            message.destinationName = this.props.id;
            client.send(message);
            ToastAndroid.showWithGravity(
                'Hoàn thành !',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            this.setState({
                onSuong: false,
                giaySuong: 0,
                phutSuong: 0
            })
        }
    }

    onBom = () => {
        if (this.state.connect) {
            const message = new Message(JSON.stringify({ bom: true }));
            message.destinationName = this.props.id;
            client.send(message);
            ToastAndroid.showWithGravity(
                'Hoàn thành !',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            this.setState({
                onBom: true
            })
            clearInterval(this.interBom);
            this.interBom = setInterval(() => {
                if (this.state.giayBom === 59) {
                    this.setState({
                        giayBom: 0,
                        giayBom: this.state.phutBom + 1
                    })
                }
                this.setState({
                    giayBom: this.state.giayBom + 1
                })
            }, 1000);
        }
    }

    offBom = () => {
        if (this.state.connect) {
            const message = new Message(JSON.stringify({ bom: false }));
            message.destinationName = this.props.id;
            client.send(message);
            ToastAndroid.showWithGravity(
                'Hoàn thành !',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            this.setState({
                onBom: false,
                giayBom: 0,
                phutBom: 0
            })
        }
    }

}

const styles = StyleSheet.create({
    containner: {
        marginBottom: 20,
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    borderBox: {
        marginLeft: 20,
        marginRight: 20,
        borderColor: 'black',
        borderStyle: 'solid',
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    View: {
        flex: 1,
        alignItems: 'center'
    },
    Text: {
        justifyContent: 'center',
        fontSize: 20, marginTop: 10
    }
});



const mapStateToProps = state => {
    return {
        id: state.id,
    }
}


export default connect(mapStateToProps, null)(CaiDat);
