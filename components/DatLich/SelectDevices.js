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
                this.props.change_selected_dv('TB1');
                break;
            case 'TB2':
                this.props.change_selected_dv('TB2');
                break;
            case 'TB3':
                this.props.change_selected_dv('TB3');
                break;
            case 'TB4':
                this.props.change_selected_dv('TB4');
                break;
        }
    }

    componentDidMount() {
        this.props.change_selected_dv('TB1');
    }

    render() {
        let { TB, listDV } = this.props;
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
                            <MaterialCommunityIcons name="fan" size={60} color={TB[0] === true ? "#085007" : "#A2A2A2"} />
                        </View>
                        <View style={{ flex: 8, justifyContent: 'center' }}>
                            <Text style={{ fontSize: TB[0] === true ? 27 : 25, textAlign: 'left', fontWeight: 'bold', color: TB[0] === true ? "#085007" : "#A2A2A2" }}>{listDV[0]}</Text>
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
                            <MaterialCommunityIcons name="fan" size={60} color={TB[1] === true ? "#085007" : "#A2A2A2"} />
                        </View>
                        <View style={{ flex: 8, justifyContent: 'center' }}>
                            <Text style={{ fontSize: TB[1] === true ? 27 : 25, textAlign: 'left', fontWeight: 'bold', color: TB[1] === true ? "#085007" : "#A2A2A2" }}>{listDV[1]}</Text>
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
                            <MaterialCommunityIcons name="fan" size={60} color={TB[2] === true ? "#085007" : "#A2A2A2"} />
                        </View>
                        <View style={{ flex: 8, justifyContent: 'center' }}>
                            <Text style={{ fontSize: TB[2] === true ? 27 : 25, textAlign: 'left', fontWeight: 'bold', color: TB[2] === true ? "#085007" : "#A2A2A2" }}>{listDV[2]}</Text>
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
                            <MaterialCommunityIcons name="fan" size={60} color={TB[3] === true ? "#085007" : "#A2A2A2"} />
                        </View>
                        <View style={{ flex: 8, justifyContent: 'center' }}>
                            <Text style={{ fontSize: TB[3] === true ? 27 : 25, textAlign: 'left', fontWeight: 'bold', color: TB[3] === true ? "#085007" : "#A2A2A2" }}>{listDV[3]}</Text>
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
        rowCalender: state.rowCalender,
        TB: state.tb,
        listDV: state.listDV
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
        change_selected_dv: (tb) => {
            dispatch(act.change_selected_dv(tb));
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SelectDevices);
