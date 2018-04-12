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
import * as act from '../../actions/index';
import { connect } from 'react-redux';



export class SelectDayBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorDay: [true, true, true, true, true, true, true]
        }
    }

    render() {
        let { colorDay } = this.state;
        return (
            <View style={styles.wrapBar}>
                {this.renderDayCircle('T2', colorDay[0], 2)}
                {this.renderDayCircle('T3', colorDay[1], 3)}
                {this.renderDayCircle('T4', colorDay[2], 4)}
                {this.renderDayCircle('T5', colorDay[3], 5)}
                {this.renderDayCircle('T6', colorDay[4], 6)}
                {this.renderDayCircle('T7', colorDay[5], 7)}
                {this.renderDayCircle('CN', colorDay[6], 'CN')}
            </View>
        );
    }


    componentWillReceiveProps() {
        setTimeout(() => {
            let tmpColorDay = this.props.colorDay;
            
            for (let i = 0; i < 7; i++) {
                tmpColorDay[i] = tmpColorDay[i] === 1 ? true : false
            }
            this.setState({
                colorDay: tmpColorDay
            })
        }, 10)
    }


    renderDayCircle = (day, color, number) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.onTouchDay(day)}>
                <View style={{ width: 40, height: 40, backgroundColor: color === true ? 'green' : '#C4C4C4', borderRadius: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{number}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    onTouchDay = (day) => {
        var { colorDay } = this.state;
        switch (day) {
            case 'T2':
                colorDay[0] = !colorDay[0];
                this.setState({
                    colorDay: colorDay
                })
                this.props.change_day_bar(colorDay);
                break;
            case 'T3':
                colorDay[1] = !colorDay[1];
                this.setState({
                    colorDay: colorDay
                })
                this.props.change_day_bar(colorDay);
                break;
            case 'T4':
                colorDay[2] = !colorDay[2];
                this.setState({
                    colorDay: colorDay
                })
                this.props.change_day_bar(colorDay);
                break;
            case 'T5':
                colorDay[3] = !colorDay[3];
                this.setState({
                    colorDay: colorDay
                })
                this.props.change_day_bar(colorDay);
                break;
            case 'T6':
                colorDay[4] = !colorDay[4];
                this.setState({
                    colorDay: colorDay
                })
                this.props.change_day_bar(colorDay);
                break;
            case 'T7':
                colorDay[5] = !colorDay[5];
                this.setState({
                    colorDay: colorDay
                })
                this.props.change_day_bar(colorDay);
                break;
            case 'CN':
                colorDay[6] = !colorDay[6];
                this.setState({
                    colorDay: colorDay
                })
                this.props.change_day_bar(colorDay);
                break;
        }
    }
}


const styles = StyleSheet.create({
    wrapBar: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
        borderColor: '#460259',
        borderStyle: 'solid',
    }
});



const mapStateToProps = state => {
    return {
        id: state.id,
        rowCalender: state.rowCalender,
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
        },
        change_day_bar: (array, index) => {
            dispatch(act.change_day_bar(array, index));
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SelectDayBar);