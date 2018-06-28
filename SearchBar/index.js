
import React, { PureComponent } from 'react';


import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native';

import SEARCH from './image/search.png';
import SEARCH_DELETE from './image/search-delete.png';


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f6f6f6',
    },
    TextInput: {
        flex: 1,
        height: (35 / 375) * width,
        paddingLeft: 10,
        fontSize: 14,
        color: '#cbfffc',
        paddingVertical: 0,
    },
    TextInputWrap: {
        height: (35 / 375) * width,
        width,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#008880',
    },
    searchIcon: {
        width: 22,
        height: 22,
        marginLeft: 8,
    },
    deleteIcon: {
        width: 13,
        height: 13,
    },
    deleteWrap: {
        width: 13,
        height: 13,
        marginRight: 10,
    },
});

export default class SearchBar extends PureComponent {

    static navigationOptions = () => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.state = {
          searchValue: '',
          haveSearched: false,
          currentSearchValue: '',
        }
    }

    componentDidMount() {
        this.textInput.focus();
    }
    search = () => {

    }
    searchMore = (type) => {

    }

    resetSearch = () => {
        this.setState({
            haveSearched: false,
            searchValue: '',
            currentSearchValue: '',
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderSearchBar()}
            </View>
        );
    }
    renderSearchBar() {
        return (
            <View style={styles.searchWrap}>
                <View style={styles.TextInputWrap}>
                    <Image source={SEARCH} style={styles.searchIcon} />
                    <TextInput
                        ref={textInput => this.textInput = textInput}
                        placeholder={'输入标题或关键词'}
                        placeholderTextColor="#45c8c0"
                        maxLength={40}
                        returnKeyType={'search'}
                        style={styles.TextInput}
                        selectionColor="#57d5ce"
                        multiline={false}
                        underlineColorAndroid={'transparent'}
                        onSubmitEditing={() => { this.search(); }}
                        onChangeText={(value) => {
                            if (value) {
                                this.setState({
                                    searchValue: value,
                                });
                            } else {
                                this.setState({
                                    haveSearched: false,
                                    searchValue: value,
                                });
                            }
                        }}
                        value={this.state.searchValue} />
                    {this.state.searchValue && this.state.searchValue.length > 0 ?
                        <TouchableOpacity onPress={this.resetSearch} style={styles.deleteWrap}>
                            <Image source={SEARCH_DELETE} style={styles.deleteIcon} />
                        </TouchableOpacity>
                        : null}
                </View>
            </View>
        );
    }
}
