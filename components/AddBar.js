import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid,
    TouchableWithoutFeedback
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import * as act from '../actions/index';

export class AddBar extends Component {
    render() {
        let { name, machine } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.wrapBTN}>
                    <Button
                        onPress={() => this.onPressAdd()}
                        title="Thêm"
                        color="#DCA452"
                        accessibilityLabel="Bấm vào để thêm vào thiết bị"
                    />
                </View>
                {this.renderDetailMachine(name, machine)}
            </View>
        );
    }

    componentDidMount() {
        this.props.getListName();
        setTimeout(() => {
            if (this.props.machine[0] !== undefined)
                this.props.addCurrentID(this.props.machine[0]);
        }, 100)
    }


    renderDetailMachine = (name, machine) => {
        var result = null;
        result = name.map((value, index) => {
            return (
                <View style={styles.wrapBTN} key={index}>
                    <Button
                        onPress={() => this.onPress(machine[index])}
                        title={value}
                        color={this.props.currentID === machine[index] ? "#1F9E28" : "#B4B4B4"}
                        accessibilityLabel="Bấm vào để điều khiển thiết bị"
                    />
                </View>
            );
        })
        return result;
    }

    onPressAdd = () => {
        this.props.status_page('SCAN');
    }

    onPress = (value) => {
        this.props.addCurrentID(value);
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

const mapStateToProps = state => {
    return {
        currentID: state.id,
        machine: state.machine,
        name: state.name
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addCurrentID: (id) => {
            dispatch(act.addCurrentID(id));
        },
        status_page: (status) => {
            dispatch(act.status_page(status));
        },
        getListName: () => {
            dispatch(act.getListName());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBar);
