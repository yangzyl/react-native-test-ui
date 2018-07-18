import React, { PureComponent } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Platform,
  Text,
  CameraRoll,
  Image,
  TouchableOpacity,
  Alert,
  ListView,
} from 'react-native';
import Toast from 'react-native-root-toast';


const fetchParams = {
    first: 9999,
};
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    scrollViewCont: {
        flex: 1,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    image: {
        height: (screenWidth - 25) / 4,

        width: (screenWidth - 25) / 4,
    },
    row: {
        flexDirection: 'row',
    },
    imageCont: {
        height: (screenWidth - 20) / 4,
        width: (screenWidth - 20) / 4,
        position: 'relative',
        marginTop: 5,
        marginLeft: 5,
    },
    selectCont: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 24,
        height: 24,
        zIndex: 1,
        backgroundColor: '#08aca2',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    isSelect: {
        backgroundColor: '#08aca2',
    },
    isfull: {
        height: (screenWidth - 25) / 4,
        width: (screenWidth - 25) / 4,
        backgroundColor: 'rgba(255, 255, 255, .6)',
        marginBottom: Platform.OS === 'ios' ? 0 : -(screenWidth - 25) / 4,
        position: Platform.OS === 'ios' ? 'absolute' : 'relative',
        top: 0,
        left: 0,
        zIndex: Platform.OS === 'ios' ? 1 : 0,
    },
    photosCont: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    unSelectImage: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    numText: {
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 15,
    },
    topCont: {
        height: Platform.OS === 'ios' ? (isIPhoneX ? 74 : 64) : 44,
        backgroundColor: 'rgba(3, 3, 3, .6)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'ios' ? (isIPhoneX ? 30 : 20) : 0,
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // width: screenWidth,
        // zIndex: 1,
    },
    bottomCont: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 44,
        backgroundColor: '#292c35',
        paddingRight: 12,
    },
    backCont: {
        position: 'absolute',
        bottom: 0,
        left: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
    },
    backImage: {
        width: 22,
        height: 22,
    },
    confirmCont: {
        width: 56,
        height: 32,
        backgroundColor: '#08aca2',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmText: {
        fontSize: 14,
        color: '#fff',
    },
    backText: {
        fontSize: 16,
        color: '#fff',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
    },
    unSelectImageCont: {
        width: 24,
        height: 24,
        backgroundColor: '#eee',
        borderRadius: 12,
    },
    unConfirmCont: {
        width: 56,
        height: 32,
        backgroundColor: '#aaa',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default class AlbumList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            selectPhotos: [],
            fetchParams: {
                first: 200,
            },
            stopFetchMore: false,
        };
    }

    componentDidMount() {
        this.loadPhotos();
    }
    loadPhotos = () => {
        const _that = this;
        const promise = CameraRoll.getPhotos(this.state.fetchParams);
        promise.then((data) => {
            const edges = data.edges;
            const photos = [];
            console.log(edges.length)
            for (let i = 0; i < edges.length; i += 4) {
                if (edges[i + 3]) {
                    photos.push([{ uri: edges[i].node.image.uri, select: 0 },
                      { uri: edges[i + 1].node.image.uri, select: 0 },
                      { uri: edges[i + 2].node.image.uri, select: 0 },
                      { uri: edges[i + 3].node.image.uri, select: 0 }]);
                } else if (edges[i + 2]) {
                    photos.push([{ uri: edges[i].node.image.uri, select: 0 },
                      { uri: edges[i + 1].node.image.uri, select: 0 },
                      { uri: edges[i + 2].node.image.uri, select: 0 }]);
                } else if (edges[i + 1]) {
                    photos.push([{ uri: edges[i].node.image.uri, select: 0 },
                      { uri: edges[i + 1].node.image.uri, select: 0 }]);
                } else {
                    photos.push([{ uri: edges[i].node.image.uri, select: 0 }]);
                }
            }
            _that.setState({
                photos,
                fetchParams: {
                    first: this.state.fetchParams.first + 200,
                },
                stopFetchMore: edges.length < this.state.fetchParams.first,
            });
        }, () => {
            this.loading = false;
            if (Platform.OS === 'ios') {
                Alert.alert('需要访问本地相册', '权限提醒', [
                    { text: '去设置', onPress: () => { console.log(ccc) },
                    },
                    { text: '取消', onPress: () => {} },
                ]);
                return;
            }
            Alert.alert('去设置中开启本地相册权限', '权限提醒', [
                { text: '知道了', onPress: () => {} },
            ]);
        });
    }
    fetchMore = () => {
        if (this.state.stopFetchMore) {
            return;
        }
        this.loadPhotos();
    }
    selectPhoto = (data, i, rowID) => {
        const { maxNum } = this.props;
        const { selectPhotos, photos } = this.state;
        if (selectPhotos.length > maxNum) {
            return;
        }
        if (data.select === 0 && selectPhotos.length < maxNum) {
            selectPhotos.push(data.uri);
            photos[rowID][i].select = 1;
        } else if (data.select === 0 && selectPhotos.length >= maxNum) {
            Toast.show(`最多可选${maxNum}张照片`);
        } else {
            for (let i in selectPhotos) {
                if (data.uri === selectPhotos[i]) {
                    selectPhotos.splice(i, 1);
                }
            }
            photos[rowID][i].select = 0;
        }

        this.setState({
            selectPhotos,
            photos,
        });
    }

    shouldComponentUpdate() {
        return true;
    }

    renderPhoteCont = (item, rowID, selectPhotos, maxNum) => {
        return (<View style={styles.photosCont}>{item.map((ss, i) => this.renderPhoto(ss, i, rowID, selectPhotos, maxNum))}</View>);
    }

    renderNum = (data) => {
        const { selectPhotos } = this.state;
        let num;
        for (let i in selectPhotos) {
            if (selectPhotos[i] === data.uri) {
                num = parseInt(i, 10) + 1
            }
        }
        return (
            <Text>{num}</Text>
        );
    }

    complete = () => {
        const { completePhoto } = this.props;
        const { selectPhotos } = this.state;
        if (selectPhotos.length > 0) {
            completePhoto(selectPhotos);
        }
    }

    renderPhoto = (photos, i, rowID, selectPhotos, maxNum) => {
        return (
            <TouchableOpacity key={i} style={styles.imageCont} onPress={() => this.selectPhoto(photos, i, rowID)}>
                <View style={styles.selectCont}>
                    {
                      photos.select !== 0 ? <Text style={styles.numText}>{this.renderNum(photos)}</Text> :
                      <View style={styles.unSelectImageCont}>
                          <Image resizeMode="stretch" style={styles.unSelectImage} source={UNSELECT} />
                      </View>
                    }
                </View>

                {
                    photos.select === 0 && selectPhotos.length === maxNum ? <View style={styles.isfull} /> : null
                }
                <Image resizeMode="stretch" style={styles.image} source={{ uri: photos.uri }} />
            </TouchableOpacity>
        );
    }
    render() {
        const photos = this.state.photos || [];
        const { maxNum, toCamera, noBack, toText } = this.props;
        const { selectPhotos } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.topCont}>
                    <TouchableOpacity
                        onPress={noBack ? toText : toCamera}
                        style={styles.backCont}>
                        <Image resizeMode="stretch" style={styles.backImage} source={BACK} />
                        <Text style={styles.backText}>返回</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>相册</Text>
                </View>
                <ListView
                    onEndReached={this.fetchMore}
                    enableEmptySections
                    onEndReachedThreshold={170}
                    dataSource={ds.cloneWithRows(photos)}
                    renderRow={(item, sectionID, rowID) => this.renderPhoteCont(item, rowID, selectPhotos, maxNum)} />
                <View style={styles.bottomCont}>

                    {
                        selectPhotos.length === 0 ? <View style={styles.unConfirmCont}>
                            <Text style={styles.confirmText}>确认</Text>
                        </View> : <TouchableOpacity onPress={() => this.complete()} style={styles.confirmCont}>
                            <Text style={styles.confirmText}>确认</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }
  }
