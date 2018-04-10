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



export class TableDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: false,
            gio1: '00', phut1: '00', phutChay1: '0',
            gio2: '00', phut2: '00', phutChay2: '0',
            gio3: '00', phut3: '00', phutChay3: '0',
            gio4: '00', phut4: '00', phutChay4: '0',
            gio5: '00', phut5: '00', phutChay5: '0',
            gio6: '00', phut6: '00', phutChay6: '0',
            gio7: '00', phut7: '00', phutChay7: '0',
            gio8: '00', phut8: '00', phutChay8: '0',
        }
    }

    timePicker_1 = async (stateKey, options) => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 0,
                minute: 0,
                is24Hour: true,
            });
            if (action === TimePickerAndroid.timeSetAction) {
                this.setState({ gio1: hour, phut1: minute });
            } else if (action === TimePickerAndroid.dismissedAction) {
                this.setState({ gio1: '00', phut1: '00' });
            }
        } catch ({ code, message }) {
            console.warn('Lỗi chọn ngày!', message);
        }
    }

    sliderTime_1 = (time) => {
        this.setState({
            phutChay1: time
        })
    }

    timePicker_2 = async (stateKey, options) => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 0,
                minute: 0,
                is24Hour: true,
            });
            if (action === TimePickerAndroid.timeSetAction) {
                this.setState({ gio2: hour, phut2: minute });
            } else if (action === TimePickerAndroid.dismissedAction) {
                this.setState({ gio2: '00', phut2: '00' });
            }
        } catch ({ code, message }) {
            console.warn('Lỗi chọn ngày!', message);
        }
    }

    sliderTime_2 = (time) => {
        this.setState({
            phutChay2: time
        })
    }

    timePicker_3 = async (stateKey, options) => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 0,
                minute: 0,
                is24Hour: true,
            });
            if (action === TimePickerAndroid.timeSetAction) {
                this.setState({ gio3: hour, phut3: minute });
            } else if (action === TimePickerAndroid.dismissedAction) {
                this.setState({ gio3: '00', phut3: '00' });
            }
        } catch ({ code, message }) {
            console.warn('Lỗi chọn ngày!', message);
        }
    }

    sliderTime_3 = (time) => {
        this.setState({
            phutChay3: time
        })
    }

    timePicker_4 = async (stateKey, options) => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 0,
                minute: 0,
                is24Hour: true,
            });
            if (action === TimePickerAndroid.timeSetAction) {
                this.setState({ gio4: hour, phut4: minute });
            } else if (action === TimePickerAndroid.dismissedAction) {
                this.setState({ gio4: '00', phut4: '00' });
            }
        } catch ({ code, message }) {
            console.warn('Lỗi chọn ngày!', message);
        }
    }

    sliderTime_4 = (time) => {
        this.setState({
            phutChay4: time
        })
    }

    timePicker_5 = async (stateKey, options) => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 0,
                minute: 0,
                is24Hour: true,
            });
            if (action === TimePickerAndroid.timeSetAction) {
                this.setState({ gio5: hour, phut5: minute });
            } else if (action === TimePickerAndroid.dismissedAction) {
                this.setState({ gio5: '00', phut5: '00' });
            }
        } catch ({ code, message }) {
            console.warn('Lỗi chọn ngày!', message);
        }
    }

    sliderTime_5 = (time) => {
        this.setState({
            phutChay5: time
        })
    }

    timePicker_6 = async (stateKey, options) => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 0,
                minute: 0,
                is24Hour: true,
            });
            if (action === TimePickerAndroid.timeSetAction) {
                this.setState({ gio6: hour, phut6: minute });
            } else if (action === TimePickerAndroid.dismissedAction) {
                this.setState({ gio6: '00', phut6: '00' });
            }
        } catch ({ code, message }) {
            console.warn('Lỗi chọn ngày!', message);
        }
    }

    sliderTime_6 = (time) => {
        this.setState({
            phutChay6: time
        })
    }

    timePicker_7 = async (stateKey, options) => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 0,
                minute: 0,
                is24Hour: true,
            });
            if (action === TimePickerAndroid.timeSetAction) {
                this.setState({ gio7: hour, phut7: minute });
            } else if (action === TimePickerAndroid.dismissedAction) {
                this.setState({ gio7: '00', phut7: '00' });
            }
        } catch ({ code, message }) {
            console.warn('Lỗi chọn ngày!', message);
        }
    }

    sliderTime_7 = (time) => {
        this.setState({
            phutChay7: time
        })
    }


    timePicker_8 = async (stateKey, options) => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 0,
                minute: 0,
                is24Hour: true,
            });
            if (action === TimePickerAndroid.timeSetAction) {
                this.setState({ gio8: hour, phut8: minute });
            } else if (action === TimePickerAndroid.dismissedAction) {
                this.setState({ gio8: '00', phut8: '00' });
            }
        } catch ({ code, message }) {
            console.warn('Lỗi chọn ngày!', message);
        }
    }

    sliderTime_8 = (time) => {
        this.setState({
            phutChay8: time
        })
    }





    render() {
        console.log(this.state);
        return (
            <View style={{ flex: 10, flexDirection: 'column' }}>
                {this.props.rowCalender >= 1 ?
                    <View style={styles.card}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text onPress={this.timePicker_1.bind(this, 'to', {})} style={{ fontSize: 55, fontWeight: 'bold', textAlign: 'center' }}>
                                {this.state.gio1}:{this.state.phut1}
                            </Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'column' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    {this.state.phutChay1} Phút
                    </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Slider onValueChange={value => this.sliderTime_1(value)} minimumValue={0} maximumValue={10} step={0.5}></Slider>
                            </View>
                        </View>
                    </View> : <View></View>
                }

                {this.props.rowCalender >= 2 ?
                    <View style={styles.card}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text onPress={this.timePicker_2.bind(this, 'to', {})} style={{ fontSize: 55, fontWeight: 'bold', textAlign: 'center' }}>
                                {this.state.gio2}:{this.state.phut2}
                            </Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'column' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    {this.state.phutChay2} Phút
                          </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Slider onValueChange={value => this.sliderTime_2(value)} minimumValue={0} maximumValue={10} step={0.5}></Slider>
                            </View>
                        </View>
                    </View> : <View></View>
                }

                {this.props.rowCalender >= 3 ?
                    <View style={styles.card}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text onPress={this.timePicker_3.bind(this, 'to', {})} style={{ fontSize: 55, fontWeight: 'bold', textAlign: 'center' }}>
                                {this.state.gio3}:{this.state.phut3}
                            </Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'column' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    {this.state.phutChay3} Phút
                         </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Slider onValueChange={value => this.sliderTime_3(value)} minimumValue={0} maximumValue={10} step={0.5}></Slider>
                            </View>
                        </View>
                    </View> : <View></View>
                }

                {this.props.rowCalender >= 4 ?
                    <View style={styles.card}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text onPress={this.timePicker_4.bind(this, 'to', {})} style={{ fontSize: 55, fontWeight: 'bold', textAlign: 'center' }}>
                                {this.state.gio4}:{this.state.phut4}
                            </Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'column' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    {this.state.phutChay4} Phút
                            </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Slider onValueChange={value => this.sliderTime_4(value)} minimumValue={0} maximumValue={10} step={0.5}></Slider>
                            </View>
                        </View>
                    </View> : <View></View>
                }

                {this.props.rowCalender >= 5 ?
                    <View style={styles.card}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text onPress={this.timePicker_5.bind(this, 'to', {})} style={{ fontSize: 55, fontWeight: 'bold', textAlign: 'center' }}>
                                {this.state.gio5}:{this.state.phut5}
                            </Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'column' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    {this.state.phutChay5} Phút
                         </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Slider onValueChange={value => this.sliderTime_5(value)} minimumValue={0} maximumValue={10} step={0.5}></Slider>
                            </View>
                        </View>
                    </View> : <View></View>
                }

                {this.props.rowCalender >= 6 ?
                    <View style={styles.card}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text onPress={this.timePicker_6.bind(this, 'to', {})} style={{ fontSize: 55, fontWeight: 'bold', textAlign: 'center' }}>
                                {this.state.gio6}:{this.state.phut6}
                            </Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'column' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    {this.state.phutChay6} Phút
                        </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Slider onValueChange={value => this.sliderTime_6(value)} minimumValue={0} maximumValue={10} step={0.5}></Slider>
                            </View>
                        </View>
                    </View> : <View></View>
                }

                {this.props.rowCalender >= 7 ?
                    <View style={styles.card}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text onPress={this.timePicker_7.bind(this, 'to', {})} style={{ fontSize: 55, fontWeight: 'bold', textAlign: 'center' }}>
                                {this.state.gio7}:{this.state.phut7}
                            </Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'column' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    {this.state.phutChay7} Phút
                          </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Slider onValueChange={value => this.sliderTime_7(value)} minimumValue={0} maximumValue={10} step={0.5}></Slider>
                            </View>
                        </View>
                    </View> : <View></View>
                }

                {this.props.rowCalender >= 8 ?
                    <View style={styles.card}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text onPress={this.timePicker_8.bind(this, 'to', {})} style={{ fontSize: 55, fontWeight: 'bold', textAlign: 'center' }}>
                                {this.state.gio8}:{this.state.phut8}
                            </Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'column' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    {this.state.phutChay8} Phút
                         </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Slider onValueChange={value => this.sliderTime_8(value)} minimumValue={0} maximumValue={10} step={0.5}></Slider>
                            </View>
                        </View>
                    </View>
                    : <View></View>
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
    },
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
    }
}




export default connect(mapStateToProps, null)(TableDay);
