import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


export default class SlashScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 60, fontWeight: 'bold' }}>
                    SOLAVO
                </Text>
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
    }
});
