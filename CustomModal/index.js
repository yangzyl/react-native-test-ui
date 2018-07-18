/**
 * Created by jwh on 2018/1/9.
 */


import React, { PureComponent } from 'react';
import { View, Modal, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';


const { width, height } = Dimensions.get('window');

class CustomModal extends PureComponent {
    render() {
        return (
            <Modal
                transparent={true}
                onRequestClose={() => this.props.onRequestClose()}
                visible={this.props.modal.visible && this.props.modalVisible}>
                <View style={styles.container}>
                    {this.props.children}
                </View>
            </Modal>
        );
    }
};

const mapStateToProps = state => ({
    modal: state.get('modal').toJS(),
});

const mapDispatchToProps = dispatch => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
