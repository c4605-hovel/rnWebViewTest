import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Keyboard,
  LayoutAnimation,
  Platform,
  StyleSheet,
  ViewPropTypes,
  Dimensions
} from 'react-native';
import SafeArea from 'react-native-safe-area';

const accessoryAnimation = (duration, easing, animationConfig = null) => {
  if (animationConfig) {
    if (typeof animationConfig === 'function') {
      return animationConfig(duration, easing);
    }
    return animationConfig;
  }

  if (Platform.OS === 'android') {
    return {
      duration: 200,
      create: {
        duration: 200,
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.linear,
      }
    }
  }

  return LayoutAnimation.create(
    duration,
    LayoutAnimation.Types[easing],
    LayoutAnimation.Properties.opacity,
  )
}

const { height, width } = Dimensions.get('window')
const isSafeAreaSupported = Platform.OS === 'ios' && (height > 800 || width > 800)

class KeyboardAccessoryView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyboardHeight: 0,
      safeAreaViewBottomEdge: 0,
      isKeyboardVisible: false,
    }
  }

  componentDidMount () {
    const keyboardShowEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardHideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    this.keyboardShowEventListener = Keyboard.addListener(keyboardShowEvent, this.handleKeyboardShow);
    this.keyboardHideEventListener = Keyboard.addListener(keyboardHideEvent, this.handleKeyboardHide);
    SafeArea.addEventListener('safeAreaInsetsForRootViewDidChange', this.handleSafeAreaInsetsForRootViewChange)
    SafeArea.getSafeAreaInsetsForRootView().then(this.handleSafeAreaInsetsForRootViewChange)
  }

  componentWillUnmount() {
    this.keyboardShowEventListener.remove();
    this.keyboardHideEventListener.remove();
    SafeArea.removeEventListener('safeAreaInsetsForRootViewDidChange', this.handleSafeAreaInsetsForRootViewChange)
  }

  handleSafeAreaInsetsForRootViewChange = ({ safeAreaInsets }) => {
    this.setState({
      safeAreaViewBottomEdge: safeAreaInsets.bottom,
    })
  }

  handleKeyboardShow = (keyboardEvent) => {
    if (!keyboardEvent.endCoordinates) {
      return;
    }

    const keyboardHeight = Platform.select({
      ios: keyboardEvent.endCoordinates.height,
      android: this.props.androidAdjustResize
        ? 0
        : keyboardEvent.endCoordinates.height
    });

    const keyboardAnimate = () => {
      const { animationConfig, animateOn } = this.props;

      if (animateOn === 'all' || Platform.OS === animateOn) {
        LayoutAnimation.configureNext(
          accessoryAnimation(keyboardEvent.duration, keyboardEvent.easing, animationConfig)
        );
      }

      this.setState({
        isKeyboardVisible: true,
        keyboardHeight: keyboardHeight,
      })
    };

    if (Platform.OS === 'ios' || typeof this.props.onKeyboardShowDelay !== 'number') {
      keyboardAnimate();
    } else {
      setTimeout(() => {
        keyboardAnimate()
      }, this.props.onKeyboardShowDelay);
    }

    this.setState({
      isKeyboardVisible: true,
      keyboardHeight: keyboardHeight,
    })
  }

  handleKeyboardHide = (keyboardEvent) => {
    const { animateOn, animationConfig } = this.props;

    if (animateOn === 'all' || Platform.OS === animateOn) {
      LayoutAnimation.configureNext(
        animationConfig || accessoryAnimation(keyboardEvent.duration, keyboardEvent.easing, animationConfig)
      );
    }

    this.setState({
      isKeyboardVisible: false,
      keyboardHeight: 0,
    })
  }

  render() {
    const {
      isKeyboardVisible,
      keyboardHeight,
    } = this.state;

    const {
      accessoryHeight,
      alwaysVisible,
      visibleOpacity,
      hiddenOpacity,
      hideBorder,
      style,
      inSafeAreaView,
      safeAreaBumper,
      avoidKeyboard,
    } = this.props;

    const visibleHeight = accessoryHeight + (avoidKeyboard ? keyboardHeight : 0);
    const safeAreaBottomEdge = inSafeAreaView ? this.state.safeAreaViewBottomEdge : 0;

    return (
      <View style={{ height: (isKeyboardVisible || alwaysVisible ? visibleHeight  : 0) }}>
        <View style={[
          styles.accessory,
          !hideBorder && styles.accessoryBorder,
          style,
          {
            opacity: (isKeyboardVisible || alwaysVisible ? visibleOpacity : hiddenOpacity),
            bottom: keyboardHeight - safeAreaBottomEdge,
            height: accessoryHeight + (!isKeyboardVisible ? safeAreaBottomEdge : 0),
          }
        ]}>
          { this.props.children }
        </View>
      </View>
    );
  }
}

KeyboardAccessoryView.propTypes = {
  style: (View.propTypes||ViewPropTypes).style,
  accessoryHeight: PropTypes.number.isRequired,
  animateOn: PropTypes.oneOf(['ios', 'android', 'all', 'none']),
  animationConfig: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]),
  visibleOpacity: PropTypes.number,
  hiddenOpacity: PropTypes.number,
  onKeyboardShowDelay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ]),
  androidAdjustResize: PropTypes.bool,
  alwaysVisible: PropTypes.bool,
  hideBorder: PropTypes.bool,
  inSafeAreaView: PropTypes.bool,
  avoidKeyboard: PropTypes.bool,
}

KeyboardAccessoryView.defaultProps = {
  animateOn: 'ios',
  visibleOpacity: 1,
  hiddenOpacity: 0,
  androidAdjustResize: false,
  alwaysVisible: false,
  hideBorder: false,
  inSafeAreaView: false,
  avoidKeyboard: false,
}

const styles = StyleSheet.create({
  accessory: {
    position: 'absolute',
    right: 0,
    left: 0,
    height: 50,
    backgroundColor: '#EFF0F1',
  },
  accessoryBorder: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.2)',
  }
})

export default KeyboardAccessoryView;
