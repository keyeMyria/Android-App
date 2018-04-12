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
import { Client, Message } from 'react-native-paho-mqtt';
import { connect } from 'react-redux';
import { Button, Text } from 'native-base';

export class SubmitCalender extends Component {

    datLich = () => {
        let { runLong, pointTime, tb, colorDay } = this.props;

        var lich = {
            lich: [
                [pointTime[0].hour, pointTime[0].minute, runLong[0].hour * 60 + runLong[0].minute],
                [pointTime[1].hour, pointTime[1].minute, runLong[1].hour * 60 + runLong[1].minute],
                [pointTime[2].hour, pointTime[2].minute, runLong[2].hour * 60 + runLong[2].minute],
                [pointTime[3].hour, pointTime[3].minute, runLong[3].hour * 60 + runLong[3].minute],
                [pointTime[4].hour, pointTime[4].minute, runLong[4].hour * 60 + runLong[4].minute],
                [pointTime[5].hour, pointTime[5].minute, runLong[5].hour * 60 + runLong[5].minute],
                [pointTime[6].hour, pointTime[6].minute, runLong[6].hour * 60 + runLong[6].minute],
                [pointTime[7].hour, pointTime[7].minute, runLong[7].hour * 60 + runLong[7].minute],
            ],
            TB1: tb[0],
            TB2: tb[1],
            TB3: tb[2],
            TB4: tb[3],
            day: [colorDay[0] === true ? 1 : 0, colorDay[1] === true ? 1 : 0, colorDay[2] === true ? 1 : 0, colorDay[3] === true ? 1 : 0, colorDay[4] === true ? 1 : 0, colorDay[5] === true ? 1 : 0, colorDay[6] === true ? 1 : 0]
        }

        console.log(lich);
        //if (this.state.connect === true) {
        //const datLich = new Message(JSON.stringify(lich));
        //datLich.destinationName = this.props.id;
        //client.send(datLich);
        ToastAndroid.showWithGravity(
            'Hoàn thành !',
            ToastAndroid.SHORT,
            ToastAndroid.TOP
        );
        for (let i = 1; i < 5; i++) {
            if (tb[i] === true) {
                AsyncStorage.setItem(`${this.props.id}TB${i}`, JSON.stringify(lich));
            }
        }
        // }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <Button full bordered light success full style={{ width: '100%' }} onPress={() => this.datLich()}>
                    <Text>Đặt lịch</Text>
                </Button>
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
        pointTime: state.pointTime,
        runLong: state.runLong,
        tb: state.tb,
        colorDay: state.colorDay
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



export default connect(mapStateToProps, mapDispatchToProps)(SubmitCalender);
