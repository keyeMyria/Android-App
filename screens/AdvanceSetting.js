import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    ToastAndroid,
    AsyncStorage,
    BackAndroid,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button } from 'native-base';
import NameDV from '../components/AdvanceSetting/NameDV';
import NameModule from '../components/AdvanceSetting/NameModule';
import Submit from '../components/AdvanceSetting/Submit';
import { Client, Message } from 'react-native-paho-mqtt';
import { connect } from 'react-redux';


export class AdvanceSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: false,
            allowEditTB1: false,
            allowEditTB2: false,
            allowEditTB3: false,
            allowEditTB4: false,
            allowEditTB5: false
        }
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <List>
                        <NameDV />
                        <NameModule />
                        <Submit />
                    </List>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

const mapStateToProps = state => {
    return {
        currentID: state.id
    }
}



export default connect(mapStateToProps, null)(AdvanceSetting);


