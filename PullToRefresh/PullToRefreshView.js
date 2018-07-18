/**
 * Created by jwh on 2018/1/17.
 */


import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Platform,
    Image,
} from 'react-native';

import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
// import ICON_REFRESHING from  '../../../res/images/refresh/icon-refreshing.gif';

const PULL_DOWN_DISTANCE = 50;

export default class PullToRefreshView extends Component {
    render() {
        return (
            <PullToRefreshListView
                {...this.props}
                ref={ (component) => this._pullToRefreshListView = component }
                viewType={PullToRefreshListView.constants.viewType.scrollView}
                style={this.props.style}
                contentContainerStyle={this.props.contentContainerStyle}
                renderHeader={this._renderHeader}
                onRefresh={this._onRefresh}
                onLoadMore={this._onLoadMore}
                pullDownStayDistance={PULL_DOWN_DISTANCE}
                enabledPullUp={false} >
                {this.props.children}
            </PullToRefreshListView>
        );
    }

    _onRefresh = () => {
        const { refreshTasks } = this.props;
        Promise.all(refreshTasks ? refreshTasks.map((task) => {
            task && task();
        }) : [])
            .then(() => {
                this._pullToRefreshListView.endRefresh();
            })
            .catch(() => {
                this._pullToRefreshListView.endRefresh();
            });
    };

    _onLoadMore = () => {
        this._pullToRefreshListView.endRefresh();
    };

    _renderHeader = (viewState) => {
        let { pullState } = viewState;
        let { refreshing } = PullToRefreshListView.constants.viewState;
        switch(pullState) {
            case refreshing:
                return (
                    <View style={styles.container}>
                        <Image source={{ uri: this.props.uri }} style={styles.iconRefreshing}/>
                    </View>
                );
            default:
                return (
                    <View style={[styles.container]}>
                        <Text style={this.props.headerTextStyle}>下拉刷新</Text>
                    </View>
                )
        }
    };
}

const styles = StyleSheet.create({
    container: {
        height: PULL_DOWN_DISTANCE,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconRefreshing: {
        width: 55,
        height: 25,
    }
});
