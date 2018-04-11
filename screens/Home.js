import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    ToastAndroid,
    AsyncStorage,
    BackAndroid,
    ScrollView
} from 'react-native';
import { Button,Text } from 'native-base';
import { Client, Message } from 'react-native-paho-mqtt';
import NhietDo from '../components/NhietDo';
import CaiDat from '../components/CaiDat';
import AddBar from '../components/AddBar';
import ConnectStatus from '../components/ConnectStatus';
import { connect } from 'react-redux';


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: false,
        }
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <NhietDo />
                    <CaiDat />
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Button full bordered light success full style={{ width: '100%' }}>
                        <Text>Xóa thiết bị</Text>
                    </Button>
                    {/*
                        <Button
                            onPress={() => this.onDelete()}
                            title="Delete"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                        */}
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


