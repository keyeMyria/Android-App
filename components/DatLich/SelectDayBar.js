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


export class SelectDayBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorDate: [true, true, true, true, true, true, true]
        }
    }


    TB = (index) => {
        switch (index) {
            case 'TB1':
                this.setState({ TB1: true, TB2: false, TB3: false, TB4: false, allowSync: true });
                break;
            case 'TB2':
                this.setState({ TB1: false, TB2: true, TB3: false, TB4: false, allowSync: true });
                break;
            case 'TB3':
                this.setState({ TB1: false, TB2: false, TB3: true, TB4: false, allowSync: true });
                break;
            case 'TB4':
                this.setState({ TB1: false, TB2: false, TB3: false, TB4: true, allowSync: true });
                break;
        }
    }

    render() {
        let { colorDate } = this.state;
        return (
            <View style={{
                flex: 2, flexDirection: 'row', 
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
            }}>
                {this.renderDayCircle('T2', colorDate[0], 2)}
                {this.renderDayCircle('T3', colorDate[1], 3)}
                {this.renderDayCircle('T4', colorDate[2], 4)}
                {this.renderDayCircle('T5', colorDate[3], 5)}
                {this.renderDayCircle('T6', colorDate[4], 6)}
                {this.renderDayCircle('T7', colorDate[5], 7)}
                {this.renderDayCircle('CN', colorDate[6], 'CN')}
            </View>
        );
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
        var color = this.state.colorDate;
        switch (day) {
            case 'T2':
                color[0] = !this.state.colorDate[0]
                this.setState({
                    colorDate: color
                })
                break;
            case 'T3':
                color[1] = !this.state.colorDate[1]
                this.setState({
                    colorDate: color
                })
                break;
            case 'T4':
                color[2] = !this.state.colorDate[2]
                this.setState({
                    colorDate: color
                })
                break;
            case 'T5':
                color[3] = !this.state.colorDate[3]
                this.setState({
                    colorDate: color
                })
                break;
            case 'T6':
                color[4] = !this.state.colorDate[4]
                this.setState({
                    colorDate: color
                })
                break;
            case 'T7':
                color[5] = !this.state.colorDate[5]
                this.setState({
                    colorDate: color
                })
                break;
            case 'CN':
                color[6] = !this.state.colorDate[6]
                this.setState({
                    colorDate: color
                })
                break;
        }
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



export default SelectDayBar;
