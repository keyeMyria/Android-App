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
import SelectDayBar from './DatLich/SelectDayBar';
import MoreCalender from './DatLich/MoreCalender';
import SubmitCalender from './DatLich/SubmitCalender';

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
            connect: false
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

    render() {
        let { tb } = this.props;
        for (let i = 0; i < 5; i++) {
            if (tb[i] === true) {
                AsyncStorage.getItem(`${this.props.id}TB${i}`).then(data1 => {
                    if (data1) {
                        let json = JSON.parse(data1);
                        let lich = json.lich;
                        let pointTime = [
                            { hour: lich[0][0], minute: lich[0][1] },
                            { hour: lich[1][0], minute: lich[1][1] },
                            { hour: lich[2][0], minute: lich[2][1] },
                            { hour: lich[3][0], minute: lich[3][1] },
                            { hour: lich[4][0], minute: lich[4][1] },
                            { hour: lich[5][0], minute: lich[5][1] },
                            { hour: lich[6][0], minute: lich[6][1] },
                            { hour: lich[7][0], minute: lich[7][1] },
                        ]
                        let runLong = [
                            { hour: Math.floor(lich[0][2] / 60), minute: lich[0][2] % 60 },
                            { hour: Math.floor(lich[1][2] / 60), minute: lich[1][2] % 60 },
                            { hour: Math.floor(lich[2][2] / 60), minute: lich[2][2] % 60 },
                            { hour: Math.floor(lich[3][2] / 60), minute: lich[3][2] % 60 },
                            { hour: Math.floor(lich[4][2] / 60), minute: lich[4][2] % 60 },
                            { hour: Math.floor(lich[5][2] / 60), minute: lich[5][2] % 60 },
                            { hour: Math.floor(lich[6][2] / 60), minute: lich[6][2] % 60 },
                            { hour: Math.floor(lich[7][2] / 60), minute: lich[7][2] % 60 },
                        ]
                        console.log(json);
                        let colorDay = json.day;
                        this.props.restore_calender_to_store(pointTime);
                        this.props.restore_timerun_to_store(runLong);
                        this.props.restore_color_day(colorDay);
                        this.props.restore_row_calender(json.rowCalender + 1);
                    }
                })
            }
        }

        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>

                    {this.state.connect === true ?
                        <SelectDevices /> : <View></View>
                    }

                    {this.state.connect === true ?
                        <TableDay /> : <View></View>
                    }

                    {this.state.connect === true ?
                        <SelectDayBar />
                        : <View></View>
                    }

                    {this.state.connect === true ?
                        <SubmitCalender />
                        : <View></View>
                    }
                </View >
            </ScrollView>
        );
    }


    themLich = (number) => {
        this.props.inc_row_calender(number);
    }

}


const styles = StyleSheet.create({

});



const mapStateToProps = state => {
    return {
        id: state.id,
        rowCalender: state.rowCalender,
        tb: state.tb
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
        },
        restore_calender_to_store: (data) => {
            dispatch(act.restore_calender_to_store(data));
        },
        restore_timerun_to_store: (data) => {
            dispatch(act.restore_timerun_to_store(data));
        },
        restore_color_day: (data) => {
            dispatch(act.restore_color_day(data));
        },
        restore_row_calender: (data) => {
            dispatch(act.restore_row_calender(data));
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(DatLich);
