
import React, { PureComponent } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,
} from 'react-native';
import DatePicker from 'rmc-date-picker';
import zhCn from 'rmc-date-picker/lib/locale/zh_CN';

import CustomModal from '../CustomModal';

const { width } = Dimensions.get('window');
const WARNING = require('../../../res/images/public/warning.png');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    datePickerCont: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: width * (325 / 375),
        justifyContent: 'center',
        shadowColor: '#7a7a7a',
        shadowOffset: { height: 4 },
        shadowRadius: 3,
        shadowOpacity: 0.3,
    },
    datePicker: {
        marginTop: 16,
        paddingHorizontal: 20,
    },
    dateText: {
        fontSize: 17,
        color: '#7a7a7a',
    },
    datePickerTitleCont: {
        height: 47,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#08aca2',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'relative',
    },
    closeCont: {
        position: 'absolute',
        top: 4,
        right: 4,
    },
    close: {
        width: 37,
        height: 37,
        resizeMode: 'contain',
    },
    datePickerTitle: {
        fontSize: 19,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    datePickerSmallTitle: {
        fontSize: 14,
        color: '#adadad',
        marginTop: 27,
        textAlign: 'center',
    },
    datePickerDate: {
        fontSize: 22,
        color: '#08aca2',
        marginTop: 5,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    btnCont: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 21,
    },
    btn: {
        width: 150,
        height: 40,
        borderRadius: 40,

        alignItems: 'center',
        backgroundColor: '#08aca2',
    },
    btnTitle: {
        fontSize: 17,
        color: '#fff',
        textAlign: 'center',
    },
    dataCont: {
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: 9999,
        alignItems: 'center',
        width: '100%',
    },
    tip: {
        height: 34,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#fff9f9',
    },
    tipImage: {
        width: 22,
        height: 22,
        marginRight: 17,
    },
    tipText: {
        fontSize: 14,
        color: '#d0011b',
    },
    onfireText: {
        fontSize: 16,
        color: '#fff',
        width: 54,
        textAlign: 'center',
    },
    customDatePicker: {
        backgroundColor: '#fff',
    },
    descript: {
        fontSize: 17,
        color: '#fff',
        fontWeight: 'bold',
    },
    onfire: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#08aca2',
    },
});


export default class CustomDatePicker extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            noDate: this.props.date,
            modalVisible: false,
            bottom: new Animated.Value(-284),
        };
    }

    getDate = () => this.state.date;

    onDateChange = (date) => {
        this.setState({ date });
        if (this.props.onDateChange) this.props.onDateChange(date);
    };

    showDatePicker = () => {
        this.setState({ modalVisible: true });
        modalUtil.show();
        Animated.timing(
            this.state.bottom,
            {
                toValue: 0,
                duration: 300,
            },
        ).start();
    };
    componentWillReceiveProps(nextProps) {
        if (!nextProps.modalVisible) {
            this.setState({ modalVisible: false });
        }
    }
    onCancel = () => {
        if (this.props.onDateChange) this.props.onDateChange(this.state.noDate);
        this.setState({ date: this.state.noDate, modalVisible: false });
    }
    render() {
        const { date, modalVisible, bottom, minDate, maxDate } = this.state;
        return (
            <View>
                <TouchableOpacity
                    style={this.props.style}
                    onPress={this.showDatePicker}>
                    <Text style={styles.dateText}>{date}</Text>
                </TouchableOpacity>
                <CustomModal
                    onRequestClose={() => this.setState({ modalVisible: false })}
                    modalVisible={modalVisible}>
                    <Animated.View style={[styles.dataCont, { bottom }]}>
                        <View style={styles.tip}>
                            <Image
                                style={styles.tipImage}
                                source={WARNING} />
                            <Text style={styles.tipText}>未来脑计划暂仅限 1-5 岁宝宝加入</Text>
                        </View>
                        <View style={styles.onfire}>
                            <TouchableOpacity onPress={this.onCancel}>
                                <Text style={styles.onfireText} >取消</Text>
                            </TouchableOpacity>
                            <Text style={styles.descript}>选择宝宝生日</Text>
                            <TouchableOpacity onPress={() => this.setState({ modalVisible: false })}>
                                <Text style={styles.onfireText}>确定</Text>
                            </TouchableOpacity>
                        </View>
                        <DatePicker
                            styles={styles.customDatePicker}
                            defaultDate={date}
                            mode={'date'}
                            locale={zhCn}
                            minDate={minDate}
                            maxDate={maxDate}
                            onDateChange={this.onDateChange} />
                    </Animated.View>
                    <TouchableOpacity
                        onPress={this.onCancel}
                        style={{ flex: 1, zIndex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(51, 51, 51, 0.6)' }} />
                </CustomModal>
            </View>
        );
    }
}
