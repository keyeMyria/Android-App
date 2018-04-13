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
import * as act from '../../actions/index';
import { connect } from 'react-redux';


export class NameDV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: false,
            allowEditTB1: false,
            allowEditTB2: false,
            allowEditTB3: false,
            allowEditTB4: false,
            nameTB1: '',
            nameTB2: '',
            nameTB3: '',
            nameTB4: ''
        }
    }

    componentDidMount() {
        this.setState({
            nameTB1: this.props.listDV[0],
            nameTB2: this.props.listDV[1],
            nameTB3: this.props.listDV[2],
            nameTB4: this.props.listDV[3],
        })
    }

    render() {
        let { nameTB1, nameTB2, nameTB3, nameTB4 } = this.state;
        return (
            <View>
                {this.renderInputName(1, nameTB1)}
                {this.renderInputName(2, nameTB2)}
                {this.renderInputName(3, nameTB3)}
                {this.renderInputName(4, nameTB4)}
            </View>
        );
    }

    renderInputName = (number, nameDV) => {
        let tmpName = `nameTB${number}`;
        let tmpAllow = `allowEditTB${number}`;
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => this.setState({ [tmpAllow]: true })}>
                    <ListItem icon>
                        <Left>
                            <Icon name="pulse" style={{ color: 'green' }} />
                        </Left>
                        <Body>
                            <Text style={{ fontWeight: 'bold' }}>{nameDV}</Text>
                        </Body>
                    </ListItem>
                </TouchableWithoutFeedback>
                {
                    this.state[tmpAllow] === true ?
                        <TextInput
                            underlineColorAndroid='transparent'
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={(value) => this.onChangeText(value, tmpName)}
                            value={this.state[tmpName]}
                        /> : <View></View>
                }
            </View>
        );
    }

    onChangeText = (value, tmpName) => {
        this.setState({ [tmpName]: value });
        setTimeout(() => {
            let tmpStoreName = [this.state.nameTB1, this.state.nameTB2, this.state.nameTB3, this.state.nameTB4];
            this.props.change_name_dv(tmpStoreName);
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
        currentID: state.id,
        listDV: state.listDV
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        change_name_dv: (array) => {
            dispatch(act.change_name_dv(array));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NameDV);


