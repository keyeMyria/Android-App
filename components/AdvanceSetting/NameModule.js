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


export class NameModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: false,
            allowEditTB1: false,
            allowEditTB2: false,
            allowEditTB3: false,
            allowEditTB4: false,
            allowEditTB5: false
        }
    }

    render() {
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => this.setState({ allowEditTB5: true })}>
                    <ListItem icon>
                        <Left>
                            <Icon name="keypad" style={{ color: 'green' }} />
                        </Left>
                        <Body>
                            <Text style={{ fontWeight: 'bold' }}>Tên bộ điều khiển</Text>
                        </Body>
                    </ListItem>
                </TouchableWithoutFeedback>

                {this.state.allowEditTB5 === true ?
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    /> : <View></View>
                }
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

const mapStateToProps = state => {
    return {
        currentID: state.id
    }
}



export default connect(mapStateToProps, null)(NameModule);


