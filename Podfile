rnpath = "node_modules/react-native"

source 'https://github.com/CocoaPods/Specs.git'

# Uncomment the next line to define a global platform for your project
platform :ios, '12.0'

target 'rnWebViewTest' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!

  # Pods for rnWebViewTest

  # ReactNative
  pod 'FBLazyVector', :path => "#{rnpath}/Libraries/FBLazyVector"
  pod 'FBReactNativeSpec', :path => "#{rnpath}/Libraries/FBReactNativeSpec"
  pod 'RCTRequired', :path => "#{rnpath}/Libraries/RCTRequired"
  pod 'RCTTypeSafety', :path => "#{rnpath}/Libraries/TypeSafety"
  pod 'React', :path => rnpath
  pod 'React-Core', :path => rnpath
  pod 'React-CoreModules', :path => "#{rnpath}/React/CoreModules"
  pod 'React-Core/DevSupport', :path => rnpath
  pod 'React-RCTActionSheet', :path => "#{rnpath}/Libraries/ActionSheetIOS"
  pod 'React-RCTAnimation', :path => "#{rnpath}/Libraries/NativeAnimation"
  pod 'React-RCTBlob', :path => "#{rnpath}/Libraries/Blob"
  pod 'React-RCTImage', :path => "#{rnpath}/Libraries/Image"
  pod 'React-RCTLinking', :path => "#{rnpath}/Libraries/LinkingIOS"
  pod 'React-RCTNetwork', :path => "#{rnpath}/Libraries/Network"
  pod 'React-RCTSettings', :path => "#{rnpath}/Libraries/Settings"
  pod 'React-RCTText', :path => "#{rnpath}/Libraries/Text"
  pod 'React-RCTVibration', :path => "#{rnpath}/Libraries/Vibration"
  pod 'React-Core/RCTWebSocket', :path => rnpath

  pod 'React-cxxreact', :path => "#{rnpath}/ReactCommon/cxxreact"
  pod 'React-jsi', :path => "#{rnpath}/ReactCommon/jsi"
  pod 'React-jsiexecutor', :path => "#{rnpath}/ReactCommon/jsiexecutor"
  pod 'React-jsinspector', :path => "#{rnpath}/ReactCommon/jsinspector"
  pod 'ReactCommon/jscallinvoker', :path => "#{rnpath}/ReactCommon"
  pod 'ReactCommon/turbomodule/core', :path => "#{rnpath}/ReactCommon"
  pod 'Yoga', :path => "#{rnpath}/ReactCommon/yoga"

  pod 'DoubleConversion', :podspec => "#{rnpath}/third-party-podspecs/DoubleConversion.podspec"
  pod 'glog', :podspec => "#{rnpath}/third-party-podspecs/glog.podspec"
  pod 'Folly', :podspec => "#{rnpath}/third-party-podspecs/Folly.podspec"

  # ReactNative plugins
  pod 'react-native-webview', :podspec => "node_modules/react-native-webview/react-native-webview.podspec"
  # pod 'react-native-keyboard-view', :podspec => "node_modules/react-native-keyboard-view/react-native-keyboard-view.podspec"
  pod 'react-native-safe-area', :podspec => 'node_modules/react-native-safe-area/react-native-safe-area.podspec'
end
