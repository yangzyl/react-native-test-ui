
'use strict';

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    View
} from 'react-native';
import {
    DIALOG_TYPE_ALERT,
    DIALOG_TYPE_CONFIRM,
    DIALOG_ACTION_CONFIRM,
    DIALOG_ACTION_CANCEL,
    DIALOG_ACTION_OK,
} from '../constant';
import EmptyModal from './EmptyModal';

/**
 * DialogModal
 * @props type [DIALOG_TYPE_ALERT, DIALOG_TYPE_CONFIRM]  Dialog Type
 * @props visible {bool}    是否显示 DialogModal
 * @props title string      标题
 * @props onClose function  关闭对话框回调
 */

export default class DialogModal extends PureComponent {
    render() {
        let buttons = null;
        switch (this.props.type) {
            case DIALOG_TYPE_CONFIRM:
                buttons = this.renderConfirmButton();
                break;
            case DIALOG_TYPE_ALERT:
            default:
                buttons = this.renderAlertButton();
                break;
        }
        return (
            <EmptyModal modalVisible={this.props.visible}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                    <View style={styles.buttonContainer} >
                        { buttons }
                    </View>
                </View>
            </EmptyModal>
        );
    }

    renderAlertButton() {
        return (
            <TouchableOpacity style={styles.alertButtonContainer} onPress={() => this.props.onClose(DIALOG_ACTION_OK)}>
                <View>
                    <Text style={styles.buttonText}>确定</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderConfirmButton() {
        return (
            <View style={styles.confirmButtonContainer}>
                <TouchableOpacity
                    style={styles.confirmCancelButton}
                    onPress={() => this.props.onClose(DIALOG_ACTION_CANCEL)}>
                    <View>
                        <Text style={styles.buttonText}>取消</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.spliter}/>
                <TouchableOpacity
                    style={styles.confirmConfirmButton}
                    onPress={() => this.props.onClose(DIALOG_ACTION_CONFIRM)}>
                    <View>
                        <Text style={styles.buttonText}>继续</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    onRequestClose() {
        this.props.onRequestClose && this.props.onRequestClose();
    }
}

const styles = StyleSheet.create({
    innerContainer: {
        marginLeft: 40,
        marginRight: 40,
        alignItems: 'center',
        backgroundColor: '#fff',
        opacity: 0.76,
        borderRadius: 10
    },
    title: {
        marginVertical: 16,
        marginHorizontal: 10,
        color: '#282a2a',
        fontSize: 16,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#d5d4d4'
    },
    alertButtonContainer: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 15
    },
    confirmButtonContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    spliter:{
        borderRightWidth: 1,
        borderRightColor: '#929292'
    },
    confirmCancelButton: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 15
    },
    confirmConfirmButton: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 15
    },
    buttonText: {
        fontSize: 16,
        color:"#ef1d40"
    }
});