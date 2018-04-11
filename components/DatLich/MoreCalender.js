import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    ToastAndroid,
    TouchableWithoutFeedback,
    TextInput,
    AsyncStorage,
    ScrollView
} from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';
import { Client, Message } from 'react-native-paho-mqtt';
import { connect } from 'react-redux';
import * as act from '../../actions/index';

export class MoreCalender extends Component {
    render() {
        return (
            <View style={{ flex: 2, flexDirection: 'row' }}>
                <Button bordered light success>
                    <Text>Light</Text>
                </Button>
            </View>
        );
    }


    themLich = (number) => {
        this.props.inc_row_calender(number);
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



export default connect(mapStateToProps, mapDispatchToProps)(MoreCalender);
