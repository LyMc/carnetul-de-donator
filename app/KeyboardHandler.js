/**
 * Handle resizing enclosed View and scrolling to input
 * Usage:
 *    <KeyboardHandler ref='kh' offset={50} keyboardShouldPersistTaps="never">
 *      <View>
 *        ...
 *        <TextInput ref='username'
 *          onFocus={()=>this.refs.kh.inputFocused(this,'username')}/>
 *        ...
 *      </View>
 *    </KeyboardHandler>
 *
 *  offset is optional and defaults to 34
 *  Any other specified props will be passed on to ScrollView
 *  ! i've added the ability to overwrite the keyboardShouldPersistTaps props when you use this component in a page that can be reached by navigation you have to overwrite this props to "never"
 */

import React, { Component } from 'react';

import ReactNative, {
  ScrollView,
  View,
  Keyboard,
  Platform
  // DeviceEventEmitter,
} from 'react-native';

class KeyboardHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {keyboardSpace: 0};
    this.focused = null;
    this._didShowListener = null;
    this._willHideListener = null;
    this._listeners = null;
  }

  onKeyboarDidShow(frames) {
    if (!frames.endCoordinates || !this.focused) {
      return;
    }
    this.setState({keyboardSpace: frames.endCoordinates.height});
    let scrollResponder = this.refs.scrollView.getScrollResponder();
    scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      this.focused,
      this.props.offset, //additionalOffset
      true
    );
  }

  onKeyboardWillHide() {
    this.setState({keyboardSpace: 0});
  }

  componentWillMount() {
    let _this=this;

    const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    this._listeners = [
      Keyboard.addListener(updateListener, this.onKeyboarDidShow.bind(this)),
      Keyboard.addListener(resetListener, this.onKeyboardWillHide.bind(this))
    ];

    this.scrollviewProps = {
      automaticallyAdjustContentInsets: true,
      keyboardShouldPersistTaps: _this.props.keyboardShouldPersistTaps ||  'always',
      scrollEventThrottle: 200,
    };
    // pass on any props we don't own to ScrollView
    Object.keys(this.props).filter((n) => {
      return n != 'children'
    })
      .forEach((e) => {
        this.scrollviewProps[e] = this.props[e]
      });
  }

  componentWillUnmount() {
    this._listeners.forEach(listener => listener.remove());
  }

  render() {
    return (
      <ScrollView ref='scrollView' {...this.scrollviewProps}>
        {this.props.children}
        <View style={{ height: this.state.keyboardSpace }}/>
      </ScrollView>
    );
  }

  inputFocused(_this, refName) {
    this.focused = ReactNative.findNodeHandle(_this.refs[refName]);
  }

  scrollToFocusedInput(event, reactNode) {
    this.focused = reactNode;
  }

  static propTypes = {
    offset: React.PropTypes.number
  };

  static defaultProps = {
    offset: 0
  };
}

export default KeyboardHandler
