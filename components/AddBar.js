import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class AddBar extends Component {
    render() {
        let { machine } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.wrapBTN}>
                    <Button
                        onPress={() => this.onPressAdd()}
                        title="Thêm"
                        color="#0C1261"
                        accessibilityLabel="Bấm vào để thêm vào thiết bị"
                    />
                </View>
                {this.renderDetailMachine(machine)}
            </View>
        );
    }

    renderDetailMachine = (machine) => {
        var result = null;
        result = machine.map((value, index) => {
            return (
                <View style={styles.wrapBTN} key={index}>
                    <Button
                        onPress={() => this.onPress(value)}
                        title={value}
                        color="#060428"
                        accessibilityLabel="Bấm vào để điều khiển thiết bị"
                    />
                </View>
            );
        })
        return result;
    }

    onPressAdd = () => {
        this.props.onPressAdd();
    }

    onPress = (value) => {
        console.log(value)
        //this.props.onPress();
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
