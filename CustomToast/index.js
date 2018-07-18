
import React, {
    PureComponent,
} from 'react';

import RootSiblings from 'react-native-root-siblings';
import ToastContainer, {positions, durations} from './CustomToastContainer';

export default class CustomToast extends PureComponent {
    static propTypes = ToastContainer.propTypes;

    static show = ({title, content}, options = {position: positions.CENTER, duration: durations.SHORT}) => {
        return new RootSiblings(<ToastContainer
            {...options}
            visible={true}
            title={title}
            content={content}
        />);
    };

    static hide = toast => {
        if (toast instanceof RootSiblings) {
            toast.destroy();
        } else {
            console.warn(`Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`);
        }
    };

    _toast = null;

    componentWillMount = () => {
        this._toast = new RootSiblings(<ToastContainer
            {...this.props}
            duration={0}
        />);
    };

    componentWillReceiveProps = nextProps => {
        this._toast.update(<ToastContainer
            {...nextProps}
            duration={0}
        />);
    };

    componentWillUnmount = () => {
        this._toast.destroy();
    };

    render() {
        return null;
    }
}