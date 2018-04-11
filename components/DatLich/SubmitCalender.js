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
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <Button full bordered light success full style={{ width: '100%' }}>
                    <Text>Đặt lịch</Text>
                </Button>
                {/*
                <TouchableWithoutFeedback onPress={() => this.datLich()}>
                    <View style={styles.datLichBTN}>
                        <Text style={styles.datLichTxt}>Đặt lịch</Text>
                    </View>
                </TouchableWithoutFeedback>
                */}
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



export default connect(mapStateToProps, mapDispatchToProps)(SubmitCalender);
