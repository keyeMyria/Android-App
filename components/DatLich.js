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
import TableDay from './DatLich/TableDay';
import SelectDevices from './DatLich/SelectDevices';


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
            TB1: true,
            TB2: false,
            TB3: false,
            TB4: false,
            gio1: '', phut1: '', phutChay1: '',
            gio2: '', phut2: '', phutChay2: '',
            gio3: '', phut3: '', phutChay3: '',
            gio4: '', phut4: '', phutChay4: '',
            gio5: '', phut5: '', phutChay5: '',
            allowSync: true,
            colorDate: [true, true, true, true, true, true, true]
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

    componentWillReceiveProps() {
        setTimeout(() => {
            client.subscribe(this.props.id);
        }, 100);
    }

    TB = (index) => {
        switch (index) {
            case 'TB1':
                this.setState({ TB1: true, TB2: false, TB3: false, TB4: false, allowSync: true });
                break;
            case 'TB2':
                this.setState({ TB1: false, TB2: true, TB3: false, TB4: false, allowSync: true });
                break;
            case 'TB3':
                this.setState({ TB1: false, TB2: false, TB3: true, TB4: false, allowSync: true });
                break;
            case 'TB4':
                this.setState({ TB1: false, TB2: false, TB3: false, TB4: true, allowSync: true });
                break;
        }
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
            TB1: this.state.TB1,
            TB2: this.state.TB2,
            TB3: this.state.TB3,
            TB4: this.state.TB4,
            day: [this.state.colorDate[0], this.state.colorDate[1], this.state.colorDate[2], this.state.colorDate[3], this.state.colorDate[4], this.state.colorDate[5], this.state.colorDate[6]]
        }

        var lichSEND = {
            lich: [
                [parseFloat(this.state.gio1), parseFloat(this.state.phut1), parseFloat(this.state.phutChay1)],
                [parseFloat(this.state.gio2), parseFloat(this.state.phut2), parseFloat(this.state.phutChay2)],
                [parseFloat(this.state.gio3), parseFloat(this.state.phut3), parseFloat(this.state.phutChay3)],
                [parseFloat(this.state.gio4), parseFloat(this.state.phut4), parseFloat(this.state.phutChay4)],
                [parseFloat(this.state.gio5), parseFloat(this.state.phut5), parseFloat(this.state.phutChay5)]
            ],
            TB1: this.state.TB1,
            TB2: this.state.TB2,
            TB3: this.state.TB3,
            TB4: this.state.TB4,
            day: [this.state.colorDate[0], this.state.colorDate[1], this.state.colorDate[2], this.state.colorDate[3], this.state.colorDate[4], this.state.colorDate[5], this.state.colorDate[6]]
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
            for (let i = 1; i < 5; i++) {
                let tmpName = `TB${i}`;
                if (this.state[tmpName] === true) {
                    AsyncStorage.setItem(`${this.props.id}TB1`, JSON.stringify(lich));
                }
            }
        }
    }

    render() {
        for (let i = 1; i < 5; i++) {
            let tmpName = `TB${i}`;
            if (this.state[tmpName] === true && this.state.allowSync === true) {
                AsyncStorage.getItem(`${this.props.id}${tmpName}`).then(data1 => {
                    if (data1) {
                        let json = JSON.parse(data1);
                        let data = json.lich;
                        this.setState({
                            TB1: i === 1 ? true : false,
                            TB2: i === 2 ? true : false,
                            TB3: i === 3 ? true : false,
                            TB4: i === 4 ? true : false,
                            gio1: data[0][0], phut1: data[0][1], phutChay1: data[0][2],
                            gio2: data[1][0], phut2: data[1][1], phutChay2: data[1][2],
                            gio3: data[2][0], phut3: data[2][1], phutChay3: data[2][2],
                            gio4: data[3][0], phut4: data[3][1], phutChay4: data[3][2],
                            gio5: data[4][0], phut5: data[4][1], phutChay5: data[4][2],
                            allowSync: false,
                            colorDate: json.day
                        })
                    }
                })
            }
        }

        let colorDay = [];
        for (let i = 0; i < 7; i++) {
            colorDay[i] = this.state.colorDate[i] === true ? '#013E0C' : '#8A8A8A';
        }

        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#B9B9B9' }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <SelectDevices />
                    
                    {this.state.connect === true ?
                        <TableDay /> : <View></View>
                    }

                    {this.state.connect === true ?
                        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', paddingLeft: 15, paddingRight: 15, marginBottom: 20, paddingTop: 20, paddingBottom: 20, backgroundColor: 'white' }}>
                            {this.renderDayCircle('T2', colorDay[0], 2)}
                            {this.renderDayCircle('T3', colorDay[1], 3)}
                            {this.renderDayCircle('T4', colorDay[2], 4)}
                            {this.renderDayCircle('T5', colorDay[3], 5)}
                            {this.renderDayCircle('T6', colorDay[4], 6)}
                            {this.renderDayCircle('T7', colorDay[5], 7)}
                            {this.renderDayCircle('CN', colorDay[6], 'CN')}
                        </View>
                        : <View></View>
                    }

                    {this.state.connect === true ?
                        <View style={{ flex: 2, flexDirection: 'row', backgroundColor: 'white' }}>
                            <TouchableWithoutFeedback onPress={() => this.datLich()}>
                                <View style={styles.datLichBTN}>
                                    <Text style={styles.datLichTxt}>Đặt lịch</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        : <View></View>
                    }

                    {this.state.connect === true ?
                        <View style={{ flex: 2, flexDirection: 'row', backgroundColor: 'white' }}>
                            <TouchableWithoutFeedback onPress={() => this.themLich(this.props.rowCalender)}>
                                <View style={styles.datLichBTN}>
                                    <Text style={styles.datLichTxt}>Thêm Lịch</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        : <View></View>
                    }
                </View >
            </ScrollView>
        );
    }


    themLich = (number) => {
        this.props.inc_row_calender(number);
    }


    renderDayCircle = (day, color, number) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.onTouchDay(day)}>
                <View style={{ width: 40, height: 40, backgroundColor: color, borderRadius: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{number}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    onTouchDay = (day) => {
        var color = this.state.colorDate;
        switch (day) {
            case 'T2':
                color[0] = !this.state.colorDate[0]
                this.setState({
                    colorDate: color
                })
                break;
            case 'T3':
                color[1] = !this.state.colorDate[1]
                this.setState({
                    colorDate: color
                })
                break;
            case 'T4':
                color[2] = !this.state.colorDate[2]
                this.setState({
                    colorDate: color
                })
                break;
            case 'T5':
                color[3] = !this.state.colorDate[3]
                this.setState({
                    colorDate: color
                })
                break;
            case 'T6':
                color[4] = !this.state.colorDate[4]
                this.setState({
                    colorDate: color
                })
                break;
            case 'T7':
                color[5] = !this.state.colorDate[5]
                this.setState({
                    colorDate: color
                })
                break;
            case 'CN':
                color[6] = !this.state.colorDate[6]
                this.setState({
                    colorDate: color
                })
                break;
        }
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
    },
    viewWrap: {
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
    },
    datLichBTN: {
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
    },
    datLichTxt: {
        fontSize: 30,
        textAlign: 'center',
        color: '#170559',
        fontWeight: 'bold'
    }
});



const mapStateToProps = state => {
    return {
        id: state.id,
        rowCalender: state.rowCalender
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getMachineID: () => {
            dispatch(act.getMachineID());
        },
        status_page: (status) => {
            dispatch(act.status_page(status));
        },
        inc_row_calender: (number) => {
            dispatch(act.inc_row_calender(number));
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(DatLich);
