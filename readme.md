# React Native Animated Bottom Sheet

A performant interactive bottom sheet with fully configurable options

## Features

- Extremely lightweight (~15kb) and highly performant
- Support for snapping (multi level bottom sheet)
- Smooth Animations and Gestures
- Completely Customisable
- `useBottomSheet` hook to allow the bottom sheet children to access bottom sheet methods
- Written in Typescript

## Usage

```
import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from 'rn-animated-bottom-sheet';

const App = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        openOnMount
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
```

## Available Props

| Name                   | Type     | Default | Description                                                                                            |
| ---------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `openDuration`         | number   | `450`   | Animation duration when the bottom sheet is opened                                                     |
| `closeDuration`        | number   | `300`   | Animation duration when the bottom sheet is closed                                                     |
| `onOpen`               | function | `null`  | Callback function when the bottom sheet is opened                                                      |
| `onClose`              | function | `null`  | Callback function when the bottom sheet is closed                                                      |
| `onBackdropPress`      | boolean  | `true`  | Callback function when the backdrop is pressed                                                         |
| `closeOnPressBack`     | boolean  | `true`  | Setting this true will allow the bottom sheet to close when hardware back is pressed (only on android) |
| `closeOnBackdropPress` | boolean  | `true`  | Setting this true will allow the bottom sheet to close when backdrop is pressed                        |
| `openOnMount`          | boolean  | `false` | Setting this true will automatically open the bottom sheet when the parent component is mounted        |
| `enableSnapping`       | boolean  | `false` | Set this to true when you want to snap the bottom sheet to multiple heights                            |
| `backdropColor`        | string   | `#000`  | Set this to true when you want to snap the bottom sheet to multiple heights                            |
| `customStyles`         | object   | `{}`    | Add your custom styles here!                                                                           |
| `backdropOpacity`      | number   | `0.5`   | Opacity of the backdrop                                                                                |

## Available Methods

These methods can be accessed by bottom sheet reference or `useBottomSheet` hook.

### **open**

Opens the bottom sheet

```
type open = (
  // open at provided sheetHeight
  sheetHeight?: number
) => void;
```

### **close**

Closes the bottom sheet

```
type close = () => void;
```

### **snapToPosition**

Snaps the bottom sheet to given position

```
type snapToPostion = (
    sheetHeight: number
) => void;
```

### **snapToIndex**

Snaps the bottom sheet to given index out of snapPoints (requires `enableSnapping` to be `true`)

```
type snapToIndex = (
    index: number
) => void;
```
