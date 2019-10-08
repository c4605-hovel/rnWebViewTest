import React, { useCallback, useState, useRef } from 'react'
import { AppRegistry, StyleSheet, Text, Button, View, InputAccessoryView, SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview'
import KeyboardAccessoryView from './KeyboardAccessoryView'

function WebViewKeyboardView({
  accessoryViewText,
  deleteSelection,
}) {
  return (
    <KeyboardAccessoryView accessoryHeight={50}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          backgroundColor: '#eee',
        }}
      >
        <View>
          <Text>{accessoryViewText || 'not selected'}</Text>
        </View>
        <View>
          <Button
            title="Delete"
            onPress={deleteSelection}
          />
        </View>
      </View>
    </KeyboardAccessoryView>
  )
}

function AppRoot() {
  const [selectedText, updateSelectedText] = useState('')

  const webviewRef = useRef(null)

  const deleteSelection = useCallback(() => {
    if (!webviewRef.current) return
    webviewRef.current.injectJavaScript(`document.getSelection().deleteFromDocument()`)
  }, [webviewRef])

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ html: `
<body contenteditable>
<h1>Hello world</h1>
</body>
<script>
  document.addEventListener('selectionchange', () => {
    window.ReactNativeWebView.postMessage(document.getSelection())
  })
</script>
` }}
          onMessage={event => {
            updateSelectedText(event.nativeEvent.data)
          }}
        />
      </SafeAreaView>

      <WebViewKeyboardView
        accessoryViewText={selectedText}
        deleteSelection={deleteSelection}
      />
    </>
  )
}

AppRegistry.registerComponent('AppRoot', () => AppRoot)
