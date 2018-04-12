import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    TextInput,
    BackAndroid
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'native-base';
import * as act from '../actions/index';
import { connect } from 'react-redux';

export class AddName extends Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Đặt tên thiết bị' };
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 20 }}>
                <TextInput
                    underlineColorAndroid='transparent'
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <Button full bordered light success full style={{ width: '100%', marginTop: 10 }} onPress={() => this.onAddName()}>
                    <Text>Thêm thiết bị</Text>
                </Button>
            </View>

        );
    }
    onAddName = () => {
        this.props.add_name(this.state.text);
        this.props.status_page('CONTROL');
        alert(`Vui lòng mở lại ứng dụng khi thay đổi phần cứng!`);
        setTimeout(() => {
            BackAndroid.exitApp();
        }, 1000);
    }

}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    wrapBTN: {
        width: 100,
        height: 100,
        alignContent: 'center',
        justifyContent: 'flex-start',
    }
});


const mapDispatchToProps = (dispatch, props) => {
    return {
        add_name: (name) => {
            dispatch(act.add_name(name));
        },
        status_page: (status) => {
            dispatch(act.status_page(status));
        }
    }
}

export default connect(null, mapDispatchToProps)(AddName);
