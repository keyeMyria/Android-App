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
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

    onChangeTB = (TB) => {
        switch (TB) {
            case 'TB1':
                this.setState({ TB1: true, TB2: false, TB3: false, TB4: false })
                break;
            case 'TB2':
                this.setState({ TB1: false, TB2: true, TB3: false, TB4: false })
                break;
            case 'TB3':
                this.setState({ TB1: false, TB2: false, TB3: true, TB4: false })
                break;
            case 'TB4':
                this.setState({ TB1: false, TB2: false, TB3: false, TB4: true })
                break;
        }
    }


    render() {
        let { TB1, TB2, TB3, TB4 } = this.state;
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                <TouchableWithoutFeedback onPress={() => this.onChangeTB('TB1')}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderColor: '#460259',
                        borderStyle: 'solid',
                        borderBottomWidth: 1
                    }}>
                        <View style={{ flex: 3, justifyContent: 'center', alignContent: 'center' }}>
                            <MaterialCommunityIcons name="fan" size={60} color={TB1 === true ? "#085007" : "#A2A2A2"} />
                        </View>
                        <View style={{ flex: 8, justifyContent: 'center' }}>
                            <Text style={{ fontSize: TB1 === true ? 27 : 25, textAlign: 'left', fontWeight: 'bold', color: TB1 === true ? "#085007" : "#A2A2A2" }}>Thiết bị 1</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => this.onChangeTB('TB2')}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderColor: '#460259',
                        borderStyle: 'solid',
                        borderBottomWidth: 1
                    }}>
                        <View style={{ flex: 3, justifyContent: 'center', alignContent: 'center' }}>
                            <MaterialCommunityIcons name="fan" size={60} color={TB2 === true ? "#085007" : "#A2A2A2"} />
                        </View>
                        <View style={{ flex: 8, justifyContent: 'center' }}>
                            <Text style={{ fontSize: TB2 === true ? 27 : 25, textAlign: 'left', fontWeight: 'bold', color: TB2 === true ? "#085007" : "#A2A2A2" }}>Thiết bị 2</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => this.onChangeTB('TB3')}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderColor: '#460259',
                        borderStyle: 'solid',
                        borderBottomWidth: 1
                    }}>
                        <View style={{ flex: 3, justifyContent: 'center', alignContent: 'center' }}>
                            <MaterialCommunityIcons name="fan" size={60} color={TB3 === true ? "#085007" : "#A2A2A2"} />
                        </View>
                        <View style={{ flex: 8, justifyContent: 'center' }}>
                            <Text style={{ fontSize: TB3 === true ? 27 : 25, textAlign: 'left', fontWeight: 'bold', color: TB3 === true ? "#085007" : "#A2A2A2" }}>Thiết bị 3</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => this.onChangeTB('TB4')}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderColor: '#460259',
                        borderStyle: 'solid',
                        borderBottomWidth: 1
                    }}>
                        <View style={{ flex: 3, justifyContent: 'center', alignContent: 'center' }}>
                            <MaterialCommunityIcons name="fan" size={60} color={TB4 === true ? "#085007" : "#A2A2A2"} />
                        </View>
                        <View style={{ flex: 8, justifyContent: 'center' }}>
                            <Text style={{ fontSize: TB4 === true ? 27 : 25, textAlign: 'left', fontWeight: 'bold', color: TB4 === true ? "#085007" : "#A2A2A2" }}>Thiết bị 4</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        );
    }
}


const styles = StyleSheet.create({

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
