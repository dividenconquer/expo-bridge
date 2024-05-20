![Frame 2](https://github.com/dividenconquer/expo-bridge/assets/47938592/11f7be72-e0a2-4204-a211-463f0a46194c)

![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  
[![NPM Version](https://img.shields.io/npm/v/@expo-bridge/core-mobile.svg?style=flat)]()

## Why should I use this library?

When developing with Expo or React Native, creating screens with web technologies often reduces development time compared to using RN (React Native). Additionally, achieving performance on both iOS and Android requires significant effort, which can be mitigated using WebView.

**Development Speed:**

WebView ≻ Expo (React Native) ≻ Native

**Performance:**

Native ≻ WebView ≂ Expo (React Native)

For optimal development speed and performance, a combination of WebView and Expo (React Native) is ideal. However, communication between WebView and RN presents challenges:

1. **WebView to Native:** Communication can be sent using the `postMessage` interface, but receiving responses is not possible. For instance, fetching the OS version from WebView is challenging with `postMessage` alone.
2. **Native to WebView:** Global functions within WebView can be called, but the native side must always call the `injectJavascript` function through the WebView ref object.
3. **WebView to WebView:** Communication between multiple WebViews is not supported in basic native-to-webview settings, negatively affecting interoperability.
4. **Clear Communication Definition:** To avoid spaghetti code, a clear definition of request handling between WebView and native is necessary.

This library resolves these issues through event propagation. Both native and each WebView have an `EventEmitter`. When communication is required, an event is emitted to its own `EventEmitter`, and based on the event's properties, it propagates to a specific WebView or native module. This structure allows native and WebView to offer identical interface functions.

For example, the `push` and `pop` functions in the `@expo-bridge/core-navigation` package emit events to the bridge provided by `@expo-bridge/core-bridge` without directly accessing the Expo router object. These events are captured by predefined listeners in `@expo-bridge/core-mobile`, which can add a new WebView or native screen to the navigation stack.

## Usage

1. **Install `@expo-bridge/core-mobile` in the Expo project.**
2. **Install `@expo-bridge/core-webview` in the WebView project.**

Then, install any necessary packages to both expo and webview. Refer to each package's documentation for installation and usage details.

### Packages

- `@expo-bridge/core-navigation`
- `@expo-bridge/core-storage`

- WIP
  - `@expo-bridge/theme`
  - `@expo-bridge/auth`

## Contributing

Sample Expo and Web projects are available in the `example` folder. Test new or modified packages within these sample apps.

### Commands

- `yarn`
- `yarn watch`
  - build packages
- `yarn example:expo`
  - run sample expo app
- `yarn example:webview`
  - run sample react web for webview (with vite)

## License

This project is licensed under the MIT License. For more details, see the [LICENSE](./LICENSE) file.
