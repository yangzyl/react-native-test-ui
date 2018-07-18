/**
 *
 * 通用的顶部 tab 组件
 *  Example:
 *  export default () => {
 *   return (
 *       <TabView>
 *           <View tabLabel="图文">
 *               <Text> 我是图文</Text>
 *           </View>
 *           <View tabLabel="音频">
 *               <Text> 我是音频</Text>
 *           </View>
 *       </TabView>
 *   )
 * }
 *
 */

import React, {PureComponent} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tabsWrap: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#efeeee',
        height: 48,
        justifyContent: 'center',
    },
    tabs: {
        width: 260,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tab: {
        flex: 1,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabContent: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#22262b',
    },
    tabContainer: {
        alignItems: 'center',
    },
    tabCurrent: {
        height: 18,
        marginTop: 16,
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    tabCurrentBorder: {
        marginTop: 10,
        width: 40,
        height: 4,
        backgroundColor: '#00ada2',
        borderRadius: 3,
    },
});

const getTabs = children => React.Children.map(children, child => child.props.tabLabel);

export default class TabView extends PureComponent {
    toTab = index => this.setState({ currentIndex: index });
    getCurrentIndex = () => this.state.currentIndex;
    constructor(props) {
        super(props);
        this.tabs = getTabs(props.children);
        this.state = {
            currentIndex: props.initialPage || 0,
        };
    }
    render() {
        return (
            <View style={this.props.container ? this.props.container : [styles.container, this.props.style]}>
                {this.renderTabs()}
                {this.renderScene()}
            </View>
        );
    }
    renderTabs() {
        return (
            <View style={this.props.tabsWrapStyle ? [{ borderBottomWidth: this.props.borderBottomWidth}, {borderBottomColor: this.props.borderBottomColor}, this.props.tabsWrapStyle] : [styles.tabsWrap, {borderBottomWidth: this.props.borderBottomWidth}, {borderBottomColor: this.props.borderBottomColor}]}>
                <View style={this.props.toggle ? this.props.toggle : styles.tabs}>
                    {
                        this.tabs.map((tab, index) => this.renderTab(index))
                    }
                </View>
            </View>
        );
    }

    clickCallBack(index) {
        this.props.callBack && this.props.callBack(index);
        this.setState({ currentIndex: index });
    }
    renderTab(index) {
        let tabColor = this.props.tabColor ? this.props.tabColor : '#22262b';
        const isCurrent = this.state.currentIndex === index;
        const style = [...styles.tab];
        if (isCurrent) {
            style.push(...styles.tabCurrent);
            tabColor = this.props.activeTabColor ? this.props.activeTabColor : '#22262b';
        }
        return (
            <TouchableOpacity
                style={style}
                key={index}
                disable={isCurrent}
                onPress={() => this.clickCallBack(index)}>
                <View style={this.props.tabContainer ? this.props.tabContainer : styles.tabContainer}>
                    <Text style={[styles.tabContent, {color: tabColor}]}>{this.tabs[index]}</Text>
                    {isCurrent ? <View style={[styles.tabCurrentBorder, this.props.tabCurrentWidth ? {width: this.props.tabCurrentWidth} : {} ]}/> : null}
                </View>
            </TouchableOpacity>
        );
    }
    renderScene() {
        const children = React.Children.map(this.props.children, child => child);
        return (
            <View style={{ flex: 1 }}>
                {children[this.state.currentIndex]}
            </View>
        );
    }
}
