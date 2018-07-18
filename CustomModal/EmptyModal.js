/**
 * Created by jwh on 2017/6/19.
 */

import React, { PureComponent } from 'react';
import { View, Modal, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class EmptyModal extends PureComponent {

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => this.onRequestClose.bind(this)}>
                <View style={styles.container}>
                    {this.props.children}
                </View>
            </Modal>
        );
    }

    onRequestClose(){
        this.props.onRequestClose && this.props.onRequestClose();
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
