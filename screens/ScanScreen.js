import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
import * as act from '../actions/index';

export class ScanScreen extends Component {
    state = {
        hasCameraPermission: null,
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {

        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            alert(`Đang lấy quyền truy cập camera!`)
            return (<View></View>);
        } else if (hasCameraPermission === false) {
            alert(`Lỗi không truy cập được camera!`);
            return (<View></View>);
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <BarCodeScanner
                        onBarCodeRead={this.handleBarCodeRead}
                        style={StyleSheet.absoluteFill}
                    />
                </View>
            );
        }
    }

    handleBarCodeRead = ({ type, data }) => {
        this.props.handleBarCodeRead({ type, data });
        this.props.addScannedID({ type, data });
        alert(`Đã quét xong, chuẩn bị chuyển trang!`);
    }
}


const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addScannedID: (scanned) => {
            dispatch(act.addScannedID(scanned));
        }
    }
}

export default connect(null, mapDispatchToProps)(ScanScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
