import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid,
    AppRegistry,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import { Client, Message } from 'react-native-paho-mqtt';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Card } from 'native-base';

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


export class CaiDat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: false,
            onTB1: false,
            onTB2: false,
            onTB3: false,
            onTB4: false,
            giayTB1: 0,
            phutTB1: 0,
            giayTB2: 0,
            phutTB2: 0,
            giayTB3: 0,
            phutTB3: 0,
            giayTB4: 0,
            phutTB4: 0,
            statusTB1: false,
            statusTB2: false,
            statusTB3: false,
            statusTB4: false
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

            //dem thoi gian thiet bi 1
            if (data.statusTB2 !== undefined && data.statusTB1 !== undefined) {
                this.setState({
                    statusTB2: data.statusTB2,
                    statusTB1: data.statusTB1,
                    statusTB3: data.statusTB3,
                    statusTB4: data.statusTB4
                })
                if (this.state.statusTB1 === true) {
                    clearInterval(this.inter);
                    this.inter = setInterval(() => {
                        if (this.state.giayTB1 === 59) {
                            this.setState({
                                giayTB1: 0,
                                phutTB1: this.state.phutTB1 + 1
                            })
                        }
                        this.setState({
                            giayTB1: this.state.giayTB1 + 1
                        })
                    }, 1000);
                } else {
                    this.setState({
                        giayTB1: 0,
                        phutTB1: 0
                    })
                }
            }

            //dem thoi gian thiet bi 2
            if (this.state.statusTB2 === true) {
                clearInterval(this.inter);
                this.inter = setInterval(() => {
                    if (this.state.giayTB2 === 59) {
                        this.setState({
                            giayTB2: 0,
                            phutTB2: this.state.phutTB2 + 1
                        })
                    }
                    this.setState({
                        giayTB2: this.state.giayTB2 + 1
                    })
                }, 1000);
            } else {
                this.setState({
                    giayTB2: 0,
                    phutTB2: 0
                })
            }

            //dem thoi gian thiet bi 3
            if (this.state.statusTB3 === true) {
                clearInterval(this.inter);
                this.inter = setInterval(() => {
                    if (this.state.giayTB3 === 59) {
                        this.setState({
                            giayTB3: 0,
                            phutTB3: this.state.phutTB3 + 1
                        })
                    }
                    this.setState({
                        giayTB3: this.state.giayTB3 + 1
                    })
                }, 1000);
            } else {
                this.setState({
                    giayTB3: 0,
                    phutTB3: 0
                })
            }

            //dem thoi gian thiet bi 4
            if (this.state.statusTB4 === true) {
                clearInterval(this.inter);
                this.inter = setInterval(() => {
                    if (this.state.giayTB4 === 59) {
                        this.setState({
                            giayTB4: 0,
                            phutTB4: this.state.phutTB4 + 1
                        })
                    }
                    this.setState({
                        giayTB4: this.state.giayTB4 + 1
                    })
                }, 1000);
            } else {
                this.setState({
                    giayTB4: 0,
                    phutTB4: 0
                })
            }

        });

        client.connect(options).then(() => {
            this.setState({
                connect: true
            })
        }).then(() => {
            client.subscribe(this.props.id);
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
            [<View style={styles.containner} key={"row 1"}>
                {this.state.connect === true ?
                    [<Card style={styles.borderBox1} key={"Thiet Bi 1"}>
                        <View style={styles.View}>
                            <Text style={styles.Text}>
                                Thiết bị 1
                            </Text>
                        </View>
                        <View style={{ flex: 1, width: 80, alignContent: 'center', alignItems: 'center', paddingBottom: 10, marginTop: 10 }}>
                            <TouchableWithoutFeedback onPress={() => this.onTB1()}>
                                <View>
                                    <Ionicons name="md-power" size={60} color={this.state.statusTB1 === true ? 'green' : 'black'} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {this.renderTimeTB1()}
                    </Card>,
                    <Card style={styles.borderBox2} key={"Thiet Bi 2"}>
                        <View style={styles.View}>
                            <Text style={styles.Text}>
                                Thiết bị 2
                                </Text>
                        </View>
                        <View style={{ flex: 1, width: 80, alignContent: 'center', alignItems: 'center', paddingBottom: 10, marginTop: 10 }}>
                            <TouchableWithoutFeedback onPress={() => this.onTB2()}>
                                <View>
                                    <Ionicons name="md-power" size={60} color={this.state.statusTB2 === true ? 'green' : 'black'} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {this.renderTimeTB2()}
                    </Card>] :
                    <View></View>
                }
            </View>,
            <View style={styles.containner} key={"row 2"}>
                {this.state.connect === true ?
                    [<Card style={styles.borderBox3} key={"Thiet bi 3"}>
                        <View style={styles.View}>
                            <Text style={styles.Text}>
                                Thiết bị 3
                            </Text>
                        </View>
                        <View style={{ flex: 1, width: 80, alignContent: 'center', alignItems: 'center', paddingBottom: 10, marginTop: 10 }}>
                            <TouchableWithoutFeedback onPress={() => this.onTB3()}>
                                <View>
                                    <Ionicons name="md-power" size={60} color={this.state.statusTB3 === true ? 'green' : 'black'} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {this.renderTimeTB3()}
                    </Card>,
                    <Card style={styles.borderBox4} key={"Thiet Bi 4"}>
                        <View style={styles.View}>
                            <Text style={styles.Text}>
                                Thiết bị 4
                                </Text>
                        </View>
                        <View style={{ flex: 1, width: 80, alignContent: 'center', alignItems: 'center', paddingBottom: 10, marginTop: 10 }}>
                            <TouchableWithoutFeedback onPress={() => this.onTB4()}>
                                <View>
                                    <Ionicons name="md-power" size={60} color={this.state.statusTB4 === true ? 'green' : 'black'} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {this.renderTimeTB4()}
                    </Card>] :
                    <View></View>
                }
            </View>]
        );
    }

    renderTimeTB1 = () => {
        if (this.state.onTB1 === true) {
            let giayTB1 = this.state.giayTB1 < 10 ? `0${this.state.giayTB1}` : this.state.giayTB1;
            let phutTB1 = this.state.phutTB1 < 10 ? `0${this.state.phutTB1}` : this.state.phutTB1;

            return (
                <View style={{ flex: 1, alignItems: 'center', paddingBottom: 10 }}>
                    <Text>{`${phutTB1}:${giayTB1}`}</Text>
                </View>
            );
        } else {
            return (
                <View></View>
            );
        }
    }

    renderTimeTB2 = () => {
        if (this.state.onTB2 === true) {
            let giayTB2 = this.state.giayTB2 < 10 ? `0${this.state.giayTB2}` : this.state.giayTB2;
            let phutTB2 = this.state.phutTB2 < 10 ? `0${this.state.phutTB2}` : this.state.phutTB2;

            return (
                <View style={{ flex: 1, alignItems: 'center', paddingBottom: 10 }}>
                    <Text>{`${phutTB2}:${giayTB2}`}</Text>
                </View>
            );
        } else {
            return (
                <View></View>
            );
        }
    }

    renderTimeTB3 = () => {
        if (this.state.onTB3 === true) {
            let giayTB3 = this.state.giayTB3 < 10 ? `0${this.state.giayTB3}` : this.state.giayTB3;
            let phutTB3 = this.state.phutTB3 < 10 ? `0${this.state.phutTB3}` : this.state.phutTB3;

            return (
                <View style={{ flex: 1, alignItems: 'center', paddingBottom: 10 }}>
                    <Text>{`${phutTB3}:${giayTB3}`}</Text>
                </View>
            );
        } else {
            return (
                <View></View>
            );
        }
    }

    renderTimeTB4 = () => {
        if (this.state.onTB4 === true) {
            let giayTB4 = this.state.giayTB4 < 10 ? `0${this.state.giayTB4}` : this.state.giayTB4;
            let phutTB4 = this.state.phutTB4 < 10 ? `0${this.state.phutTB4}` : this.state.phutTB4;

            return (
                <View style={{ flex: 1, alignItems: 'center', paddingBottom: 10 }}>
                    <Text>{`${phutTB4}:${giayTB4}`}</Text>
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


    onTB1 = () => {
        if (this.state.connect) {
            const message = new Message(JSON.stringify({ TB1: !this.state.statusTB1 }));
            message.destinationName = this.props.id;
            client.send(message);
            ToastAndroid.showWithGravity(
                'Hoàn thành !',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            this.setState({
                onTB1: !this.state.statusTB1,
            })
        }
    }

    onTB2 = () => {
        if (this.state.connect) {
            const message = new Message(JSON.stringify({ TB2: !this.state.statusTB2 }));
            message.destinationName = this.props.id;
            client.send(message);
            ToastAndroid.showWithGravity(
                'Hoàn thành !',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            this.setState({
                onTB2: !this.state.statusTB2,
            })
        }
    }

    onTB3 = () => {
        if (this.state.connect) {
            const message = new Message(JSON.stringify({ TB3: !this.state.statusTB3 }));
            message.destinationName = this.props.id;
            client.send(message);
            ToastAndroid.showWithGravity(
                'Hoàn thành !',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            this.setState({
                onTB3: !this.state.statusTB3,
            })
        }
    }

    onTB4 = () => {
        if (this.state.connect) {
            const message = new Message(JSON.stringify({ TB4: !this.state.statusTB4 }));
            message.destinationName = this.props.id;
            client.send(message);
            ToastAndroid.showWithGravity(
                'Hoàn thành !',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            this.setState({
                onTB4: !this.state.statusTB4,
            })
        }
    }
}

const styles = StyleSheet.create({
    containner: {
        marginBottom: 10,
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    borderBox1: {
        marginLeft: 20,
        marginRight: 10,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderBox2: {
        marginLeft: 10,
        marginRight: 20,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderBox3: {
        marginLeft: 20,
        marginRight: 10,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderBox4: {
        marginLeft: 10,
        marginRight: 20,
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
