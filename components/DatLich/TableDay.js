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
    ScrollView,
    TimePickerAndroid,
    Slider
} from 'react-native';
import { Client, Message } from 'react-native-paho-mqtt';
import { connect } from 'react-redux';
import * as act from '../../actions/index';


export class TableDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: false,
            pointTime: [
                { hour: 0, minute: 0 },
                { hour: 0, minute: 0 },
                { hour: 0, minute: 0 },
                { hour: 0, minute: 0 },
                { hour: 0, minute: 0 },
                { hour: 0, minute: 0 },
                { hour: 0, minute: 0 },
                { hour: 0, minute: 0 },
            ],
            runLong: [
                { hour: 0, minute: 0 },
                { hour: 0, minute: 0 },
                { hour: 0, minute: 0 },
                { hour: 0, minute: 0 },
                { hour: 0, minute: 0 },
                { hour: 0, minute: 0 },
                { hour: 0, minute: 0 },
                { hour: 0, minute: 0 },
            ],
        }
    }
 
    componentDidMount() {
        let { pointTime, runLong } = this.props;
        this.setState({
            pointTime: pointTime,
            runLong: runLong
        })
    }
    
    componentWillReceiveProps() {
        let { pointTime, runLong } = this.props;
        setTimeout(() => {
            this.setState({
                pointTime: pointTime,
                runLong: runLong
            })
        })
    }
    

    timePicker_Day = async (stateKey, options, number) => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 0,
                minute: 0,
                is24Hour: true,
            });
            if (action === TimePickerAndroid.timeSetAction) {
                let tmpH = `gio${number}`;
                let tmpM = `phut${number}`;

                console.log("Picker");
                this.props.send_day_to_store(this.props.pointTime, { hour, minute }, number);
                this.props.inc_row_calender(this.props.rowCalender > number ? this.props.rowCalender - 1 : number);
                let tmpPT = this.state.pointTime;
                tmpPT[number - 1] = { hour: hour, minute: minute };
                this.setState({
                    pointTime: tmpPT
                })
            }
        } catch ({ code, message }) {
            console.warn('Lỗi chọn ngày!', message);
        }
    }

    timePicker_Run = async (stateKey, options, number) => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 0,
                minute: 0,
                is24Hour: true,
            });
            if (action === TimePickerAndroid.timeSetAction) {
                this.props.inc_row_calender(this.props.rowCalender > number ? this.props.rowCalender - 1 : number);
                this.props.send_run_long_to_store(this.props.runLong, { hour, minute }, number);
                let tmpRT = this.state.runLong;
                tmpRT[number - 1] = { hour: hour, minute: minute };
                this.setState({
                    runLong: tmpRT
                })
            }
        } catch ({ code, message }) {
            console.warn('Lỗi chọn ngày!', message);
        }
    }

    render() {
        return (
            <View style={{ flex: 10, flexDirection: 'column' }}>
                {this.renderTimerPicker(1)}
                {this.renderTimerPicker(2)}
                {this.renderTimerPicker(3)}
                {this.renderTimerPicker(4)}
                {this.renderTimerPicker(5)}
                {this.renderTimerPicker(6)}
                {this.renderTimerPicker(7)}
                {this.renderTimerPicker(8)}

                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#17ADC5' }}>GIỜ:PHÚT ĐẶT LỊCH</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#17ADC5' }}>GIỜ:PHÚT CHẠY</Text>
                    </View>
                </View>

            </View>
        );
    }

    renderTimerPicker = (number) => {
        let tmpH = `gio${number}`;
        let tmpM = `phut${number}`;
        return (
            <View>
                {this.props.rowCalender >= number ?
                    <View style={styles.card}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text onPress={() => this.timePicker_Day('to', {}, number)} style={{ fontSize: 55, fontWeight: 'bold', textAlign: 'center' }}>
                                {this.state.pointTime[(number - 1)].hour}:{this.state.pointTime[(number - 1)].minute < 10 ? `0${this.state.pointTime[(number - 1)].minute}` : this.state.pointTime[(number - 1)].minute}
                            </Text>
                        </View>

                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text onPress={() => this.timePicker_Run('to', {}, number)} style={{ fontSize: 55, fontWeight: 'bold', textAlign: 'center' }}>
                                {this.state.runLong[(number - 1)].hour}:{this.state.runLong[(number - 1)].minute < 10 ? `0${this.state.runLong[(number - 1)].minute}` : this.state.runLong[(number - 1)].minute}
                            </Text>
                        </View>
                    </View> : <View></View>
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    card: {
        flex: 1, flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#460259',
        borderStyle: 'solid',
        borderBottomWidth: 1
    }
});



const mapStateToProps = state => {
    return {
        rowCalender: state.rowCalender,
        pointTime: state.pointTime,
        runLong: state.runLong
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        inc_row_calender: (number) => {
            dispatch(act.inc_row_calender(number));
        },
        send_day_to_store: (array, data, index) => {
            dispatch(act.set_hours_run(array, data, index));
        },
        send_run_long_to_store: (array, data, index) => {
            dispatch(act.set_run_long(array, data, index));
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(TableDay);
