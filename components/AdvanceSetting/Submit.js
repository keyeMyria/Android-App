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
import { Client, Message } from 'react-native-paho-mqtt';
import { connect } from 'react-redux';


export class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: false,
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                <View style={{ flex: 1, marginLeft: 10, marginRight: 5 }}>
                    <Button full bordered light success full style={{ width: '100%' }} onPress={() => this.submitName()}>
                        <Text>Lưu thay đổi</Text>
                    </Button>
                </View>
                <View style={{ flex: 1, marginLeft: 5, marginRight: 10 }}>
                    <Button full bordered light danger full style={{ width: '100%' }}>
                        <Text>Xóa bộ điều khiển</Text>
                    </Button>
                </View>
            </View>
        );
    }

    submitName = () => {
        let { listDV, id } = this.props;
        AsyncStorage.setItem(`${id}name`, JSON.stringify(listDV)).then(() => {
            console.log('Finished');
        });
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
        id: state.id,
        listDV: state.listDV
    }
}



export default connect(mapStateToProps, null)(Submit);


