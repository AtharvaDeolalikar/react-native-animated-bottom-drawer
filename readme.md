# React Native Animated Bottom Sheet

A performant interactive bottom sheet with fully configurable options

### Features

- Extremely lightweight (~15kb) and highly performant
- Support for snapping (multi level bottom sheet)
- Smooth Animations and Gestures
- Completely Customisable
- `useBottomSheet` hook to allow the bottom sheet children to access bottom sheet methods
- Written in Typescript

### Available Props

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
