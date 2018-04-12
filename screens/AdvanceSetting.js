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
import ConnectStatus from '../components/ConnectStatus';
import { connect } from 'react-redux';


export class AdvanceSetting extends Component {
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
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <List>
                        <TouchableWithoutFeedback onPress={() => this.setState({ allowEditTB1: true })}>
                            <ListItem icon>
                                <Left>
                                    <Icon name="pulse" style={{ color: 'green' }} />
                                </Left>
                                <Body>
                                    <Text style={{ fontWeight: 'bold' }}>Thiết bị 1</Text>
                                </Body>
                            </ListItem>
                        </TouchableWithoutFeedback>
                        {this.state.allowEditTB1 === true ?
                            <TextInput
                                underlineColorAndroid='transparent'
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                            /> : <View></View>
                        }
                        <TouchableWithoutFeedback onPress={() => this.setState({ allowEditTB2: true })}>
                            <ListItem icon>
                                <Left>
                                    <Icon name="pulse" style={{ color: 'green' }} />
                                </Left>
                                <Body>
                                    <Text style={{ fontWeight: 'bold' }}>Thiết bị 2</Text>
                                </Body>
                            </ListItem>
                        </TouchableWithoutFeedback>

                        {this.state.allowEditTB2 === true ?
                            <TextInput
                                underlineColorAndroid='transparent'
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                            /> : <View></View>
                        }
                        <TouchableWithoutFeedback onPress={() => this.setState({ allowEditTB3: true })}>
                            <ListItem icon>
                                <Left>
                                    <Icon name="pulse" style={{ color: 'green' }} />
                                </Left>
                                <Body>
                                    <Text style={{ fontWeight: 'bold' }}>Thiết bị 3</Text>
                                </Body>
                            </ListItem>
                        </TouchableWithoutFeedback>

                        {this.state.allowEditTB3 === true ?
                            <TextInput
                                underlineColorAndroid='transparent'
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                            /> : <View></View>
                        }

                        <TouchableWithoutFeedback onPress={() => this.setState({ allowEditTB4: true })}>
                            <ListItem icon>
                                <Left>
                                    <Icon name="pulse" style={{ color: 'green' }} />
                                </Left>
                                <Body>
                                    <Text style={{ fontWeight: 'bold' }}>Thiết bị 4</Text>
                                </Body>
                            </ListItem>
                        </TouchableWithoutFeedback>

                        {this.state.allowEditTB4 === true ?
                            <TextInput
                                underlineColorAndroid='transparent'
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                            /> : <View></View>
                        }
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
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, marginLeft: 10, marginRight: 5 }}>
                                <Button full bordered light success full style={{ width: '100%' }}>
                                    <Text>Lưu thay đổi</Text>
                                </Button>
                            </View>
                            <View style={{ flex: 1, marginLeft: 5, marginRight: 10 }}>
                                <Button full bordered light danger full style={{ width: '100%' }}>
                                    <Text>Xóa bộ điều khiển</Text>
                                </Button>
                            </View>
                        </View>
                    </List>
                </View>
            </ScrollView>
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



export default connect(mapStateToProps, null)(AdvanceSetting);


