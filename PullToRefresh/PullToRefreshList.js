/**
 * Created by jwh on 2018/1/18.
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
const PULL_UP_DISTANCE = 50;

export default class PullToRefreshList extends Component {
    render() {
        const { renderRow, dataSource, uri } = this.props;

        return (
            <PullToRefreshListView
                ref={ (component) => this._pullToRefreshListView = component }
                viewType={PullToRefreshListView.constants.viewType.listView}
                style={this.props.style}
                enabledPullUp={this.props.enabledPullUp}
                enabledPullDown={this.props.enabledPullDown}
                autoLoadMore={this.props.autoLoadMore}
                contentContainerStyle={this.props.contentContainerStyle}
                renderHeader={this._renderHeader}
                renderFooter={this._renderFooter}
                onRefresh={this._onRefresh}
                onLoadMore={this._onLoadMore}
                pullDownStayDistance={PULL_DOWN_DISTANCE}
                pullUpStayDistance={PULL_UP_DISTANCE}
                pullUpDistance={10}
                enableEmptySections={true}
                dataSource={dataSource}
                renderRow={renderRow}
            >
                {this.props.children}
            </PullToRefreshListView>
        )
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
        const { total, onLoadMore, data } = this.props;
        let hasLoadAll = data && data.length >= total;

        Promise.all([onLoadMore()])
            .then(() => {
                this._pullToRefreshListView.endLoadMore(hasLoadAll);
            })
            .catch(() => {
                this._pullToRefreshListView.endLoadMore(hasLoadAll);
            });
    };

    _renderHeader = (viewState) => {
        let { pullState } = viewState;
        let { refreshing } = PullToRefreshListView.constants.viewState;
        switch(pullState) {
            case refreshing:
                return (
                    <View style={styles.headerContainer}>
                        <Image source={{ uri }} style={styles.iconRefreshing}/>
                    </View>
                );
            default:
                return (
                    <View style={styles.headerContainer}>
                        <Text>下拉刷新</Text>
                    </View>
                )
        }
    };

    _renderFooter = (viewState) => {
        let { pullState } = viewState;
        let { loaded_all } = PullToRefreshListView.constants.viewState;
        switch(pullState) {
            case loaded_all:
                return (
                    <View style={styles.footerContainer}>
                        <Text>没有更多数据了</Text>
                    </View>
                );
            default:
                return (
                    <View style={styles.footerContainer}>
                        <Text>上拉加载更多</Text>
                    </View>
                );
        }
    };
}

const styles = StyleSheet.create({
    headerContainer: {
        height: PULL_DOWN_DISTANCE,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerContainer: {
        height: PULL_UP_DISTANCE,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconRefreshing: {
        width: 55,
        height: 25,
    }
});
