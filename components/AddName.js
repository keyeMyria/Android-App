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

export default class AddName extends Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder' };
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
        this.props.onAddName(this.state.text);
        console.log(this.state);
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
