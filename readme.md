# React Native Animated Bottom Drawer

A lightweight and highly performant bottom drawer for react native

## Features

- Extremely lightweight (~15kb) and highly performant
- Support for snapping (multi level bottom drawer)
- Smooth Animations and Gestures
- Completely Customisable
- `useBottomDrawer` hook to allow the bottom drawer children to access bottom drawer methods
- Written in Typescript

## Installation

using npm

```sh
npm i react-native-animated-bottom-drawer
```

using yarn

```sh
yarn add react-native-animated-bottom-drawer
```

## Usage

```tsx
import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomDrawer, {
  BottomDrawerMethods,
} from "react-native-animated-bottom-drawer";

const App = () => {
  // ref
  const bottomDrawerRef = useRef<BottomDrawerMethods>(null);

  // renders
  return (
    <View style={styles.container}>
      <BottomDrawer ref={bottomDrawerRef} openOnMount>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomDrawer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default App;
```

## Available Props

| Name                   | Type                    | Default  | Description                                                                                             |
| ---------------------- | ----------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `gestureMode`          | `handle  content  none` | `handle` | This prop determines where to apply the gestures                                                        |
| `openDuration`         | number                  | `450`    | Animation duration when the bottom drawer is opened                                                     |
| `closeDuration`        | number                  | `300`    | Animation duration when the bottom drawer is closed                                                     |
| `onOpen`               | function                | `null`   | Callback function when the bottom drawer is opened                                                      |
| `onClose`              | function                | `null`   | Callback function when the bottom drawer is closed                                                      |
| `onBackdropPress`      | boolean                 | `true`   | Callback function when the backdrop is pressed                                                          |
| `closeOnPressBack`     | boolean                 | `true`   | Setting this true will allow the bottom drawer to close when hardware back is pressed (only on android) |
| `closeOnBackdropPress` | boolean                 | `true`   | Setting this true will allow the bottom drawer to close when backdrop is pressed                        |
| `openOnMount`          | boolean                 | `false`  | Setting this true will automatically open the bottom drawer when the parent component is mounted        |
| `enableSnapping`       | boolean                 | `false`  | Set this to true when you want to snap the bottom drawer to multiple heights                            |
| `backdropColor`        | string                  | `#000`   | Set this to true when you want to snap the bottom drawer to multiple heights                            |
| `customStyles`         | object                  | `{}`     | Add your custom styles here!                                                                            |
| `backdropOpacity`      | number                  | `0.5`    | Opacity of the backdrop                                                                                 |

## Available Methods

These methods can be accessed by bottom drawer reference or `useBottomDrawer` hook.

### **open**

Opens the bottom drawer

```
type open = (
  // open at provided sheetHeight
  sheetHeight?: number
) => void;
```

**_NOTE:_** `sheetHeight` is only read when `enableSnapping` is set to `false` If `enableSnapping` is `true`, then the bottom sheet will be opened at index 0 out of `snapPoints`.

### **close**

Closes the bottom drawer

```
type close = () => void;
```

### **snapToPosition**

Snaps the bottom drawer to given position

```
type snapToPostion = (
    sheetHeight: number
) => void;
```

### **snapToIndex**

Snaps the bottom drawer to given index out of snapPoints (requires `enableSnapping` to be `true`)

```
type snapToIndex = (
    index: number
) => void;
```

**_NOTE:_** This method is only accessible when `enableSnapping` is set to `true`.
