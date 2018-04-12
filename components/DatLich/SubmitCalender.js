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
        let { runLong, pointTime, tb } = this.props;

        var lich = {
            lich: [
                [pointTime[0].hour, pointTime[0].minute, runLong[0].hour + runLong[0].minute],
                [pointTime[1].hour, pointTime[1].minute, runLong[1].hour + runLong[1].minute],
                [pointTime[2].hour, pointTime[2].minute, runLong[2].hour + runLong[2].minute],
                [pointTime[3].hour, pointTime[3].minute, runLong[3].hour + runLong[3].minute],
                [pointTime[4].hour, pointTime[4].minute, runLong[4].hour + runLong[4].minute],
                [pointTime[5].hour, pointTime[5].minute, runLong[5].hour + runLong[5].minute],
                [pointTime[6].hour, pointTime[6].minute, runLong[6].hour + runLong[6].minute],
                [pointTime[7].hour, pointTime[7].minute, runLong[7].hour + runLong[7].minute],
            ],
            TB1: tb[0],
            TB2: tb[1],
            TB3: tb[2],
            TB4: tb[3],
            //day: [this.state.colorDate[0], this.state.colorDate[1], this.state.colorDate[2], this.state.colorDate[3], this.state.colorDate[4], this.state.colorDate[5], this.state.colorDate[6]]
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
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SubmitCalender);
