/**
 * Created by jwh on 2017/6/19.
 */

'use strict';

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import EmptyModal from './EmptyModal';

/**
 * loadingModal.show(text, animated)
 * @param text {string} 说明文字
 * @param animated {bool} 是否显示「...」变化的动效
 */
class LoadingModal {
    constructor(){
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    _renderLoading(text, animated){
        return (
            <EmptyModal modalVisible={this.loading === null}>
                <ActivityIndicator size="large" color="white"/>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                    {
                        animated && <Dots />
                    }
                </View>
            </EmptyModal>
        )
    }

    show(text='', animated=false) {
        this.hide();
        this.loading = new RootSiblings(this._renderLoading(text, animated));
    }

    hide(){
        this.loading && this.loading.destroy();
        this.loading = null;
    }
}

class Dots extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            dots: ''
        };
    }

    componentDidMount(){
        this.timer = setInterval(() => {
            const dots = this.state.dots;
            if (dots.length < 16) {
                this.setState({dots: dots + '.'});
            } else {
                this.setState({dots: ''});
            }
        }, 500);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    render(){
        return (
            <Text style={styles.text}>
                {this.state.dots}
            </Text>
        )
    }
}

export default new LoadingModal();

const styles = StyleSheet.create({
    textContainer:{
        marginTop: 50,
        flexDirection:'row',
        justifyContent: 'center',
    },
    text:{
        color: '#fff',
        fontSize: 16,
    },
});