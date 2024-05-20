# Development Build

- It is not necessary to build the application every time if there are no changes in the native dependencies.
- Therefore, only when the native dependencies change, execute the following commands:
  - For iOS: `eas build --profile development-simulator --platform ios`
  - For Android: `eas build --profile development-simulator --platform android`

These commands will build the application and upload the image to the Expo Development Builds.
