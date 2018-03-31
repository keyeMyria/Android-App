import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid,
    TextInput
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as act from '../actions/index';
import { connect } from 'react-redux';

export class AddName extends Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Đặt tên thiết bị' };
    }
    render() {
        return (
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <Button
                    onPress={() => this.onAddName()}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>

        );
    }
    onAddName = () => {
        this.props.add_name(this.state.text);
        this.props.status_page('CONTROL');
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
