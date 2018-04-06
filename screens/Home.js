import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid,
    AsyncStorage,
    BackAndroid,
    ScrollView
} from 'react-native';
import { Client, Message } from 'react-native-paho-mqtt';
import NhietDo from '../components/NhietDo';
import CaiDat from '../components/CaiDat';
import AddBar from '../components/AddBar';
import { connect } from 'react-redux';
import RestartAndroid from 'react-native-restart-android'

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: false,
        }
    }
    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
    }
    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 50, justifyContent: 'center' }}>
                            SOLAVO
                    </Text>
                    </View>
                    <NhietDo />
                    <CaiDat />
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            onPress={() => this.onDelete()}
                            title="Delete"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
    onDelete = () => {
        AsyncStorage.getItem('machine').then(data => {
            let tmp = JSON.parse(data);
            let index = tmp.indexOf(this.props.currentID);
            AsyncStorage.getItem('name').then(names => {
                let tmpNames = JSON.parse(names);
                tmp.splice(index, 1);
                tmpNames.splice(index, 1);
                AsyncStorage.setItem('machine', JSON.stringify(tmp));
                AsyncStorage.setItem('name', JSON.stringify(tmpNames));
                alert(`Vui lòng mở lại ứng dụng khi thay đổi phần cứng!`);
                setTimeout(() => {
                    BackAndroid.exitApp();
                }, 1000);
            })
        })
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



export default connect(mapStateToProps, null)(Home);


