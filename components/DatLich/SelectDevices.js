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
import * as act from '../../actions/index';



export class SelectDevices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: true,
            TB1: true,
            TB2: false,
            TB3: false,
            TB4: false,
        }
    }


    render() {
        return (
            [<View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
                {this.state.connect === true ?
                    <View style={{ flex: 2, marginTop: 20 }}>
                        <TouchableWithoutFeedback onPress={() => this.TB('TB1')}>
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
                                backgroundColor: this.state.TB1 === true ? '#4c063f' : 'white'
                            }}>
                                <Text style={{
                                    fontSize: 25,
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    color: this.state.TB1 === true ? 'white' : '#460259',
                                    fontWeight: 'bold'
                                }}>Thiết bị 1</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View> :
                    <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 250 }}>
                        <Text style={{ fontSize: 30, textAlign: 'center', color: '#A81057' }}>Chưa kết nối tới server</Text>
                    </View>}
                {this.state.connect === true ?
                    <View style={{ flex: 2, marginTop: 20 }}>
                        <TouchableWithoutFeedback onPress={() => this.TB('TB2')}>
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
                                backgroundColor: this.state.TB2 === true ? '#840934' : 'white'
                            }}>
                                <Text style={{
                                    fontSize: 25,
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    color: this.state.TB2 === true ? 'white' : '#840934',
                                    fontWeight: 'bold'
                                }}>Thiết bị 2</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View> : <View></View>
                }
            </View>,
            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', paddingBottom: 20 }}>
                {this.state.connect === true ?
                    <View style={{ flex: 2, marginTop: 20 }}>
                        <TouchableWithoutFeedback onPress={() => this.TB('TB3')}>
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
                                backgroundColor: this.state.TB3 === true ? '#4c063f' : 'white'
                            }}>
                                <Text style={{
                                    fontSize: 25,
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    color: this.state.TB3 === true ? 'white' : '#460259',
                                    fontWeight: 'bold'
                                }}>Thiết bị 3</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View> :
                    <View>
                    </View>}
                {this.state.connect === true ?
                    <View style={{ flex: 2, marginTop: 20 }}>
                        <TouchableWithoutFeedback onPress={() => this.TB('TB4')}>
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
                                backgroundColor: this.state.TB4 === true ? '#840934' : 'white'
                            }}>
                                <Text style={{
                                    fontSize: 25,
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    color: this.state.TB4 === true ? 'white' : '#840934',
                                    fontWeight: 'bold'
                                }}>Thiết bị 4</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View> : <View></View>
                }
            </View>]
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



export default connect(mapStateToProps, mapDispatchToProps)(SelectDevices);
