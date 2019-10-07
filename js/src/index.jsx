import React, { useCallback } from 'react'
import { AppRegistry, StyleSheet, Text, View, InputAccessoryView, SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview'
import KeyboardAccessoryView from './KeyboardAccessoryView'

function WebViewKeyboardView() {
  const renderStickyView = useCallback(() => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#eee',
      }}
    >
      <Text
        onPress={() => console.log('clicked')}
      >Sticky</Text>
    </View>
  ), [])

  const renderCoverView = useCallback(() => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEE',
      }}
    >
      <Text>Cover</Text>
    </View>
  ), [])

  return (
    <KeyboardAccessoryView
      accessoryHeight={50}
    >
      {renderStickyView()}
    </KeyboardAccessoryView>
  )
}

function AppRoot() {
  return (
    <>
      <WebView
        originWhitelist={['*']}
        source={{ html: '<body contenteditable><h1>Hello world</h1></body>' }}
      />

      <WebViewKeyboardView />
    </>
  )
}

AppRegistry.registerComponent('AppRoot', () => AppRoot)
