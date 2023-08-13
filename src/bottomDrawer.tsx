import React, {
  useState,
  useRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
} from 'react';
import {
  View,
  Modal,
  Animated,
  PanResponder,
  Pressable,
  Easing,
  Keyboard,
} from 'react-native';
import {styles} from './styles';
import {
  BottomDrawerMethods,
  BottomDrawerWithRef,
  SnapToPositionConfig,
} from '..';
import {BottomSheetContext} from './hooks/useBottomDrawer';
import {
  defaultBackdropColor,
  defaultBackdropOpacity,
  defaultCloseDuration,
  defaultGestureMode,
  defaultInitialHeight,
  defaultInitialIndex,
  defaultOpenDuration,
  defaultSnapPoints,
  defaultSafeTopOffset,
  screenHeight,
} from './constants';
import useBottomDrawerKeyboard from './hooks/useBottomDrawerKeyboard';

const BottomDrawer: ForwardRefRenderFunction<
  BottomDrawerMethods,
  BottomDrawerWithRef
> = (props, ref) => {
  const {
    onClose = null,
    openDuration = defaultOpenDuration,
    closeDuration = defaultCloseDuration,
    customStyles = {handleContainer: {}, handle: {}, container: {}},
    onOpen = null,
    closeOnDragDown = true,
    closeOnPressBack = true,
    backdropOpacity = defaultBackdropOpacity,
    onBackdropPress = null,
    closeOnBackdropPress = true,
    initialHeight = defaultInitialHeight,
    children,
    openOnMount = false,
    backdropColor = defaultBackdropColor,
    snapPoints = defaultSnapPoints,
    initialIndex = defaultInitialIndex,
    enableSnapping = false,
    gestureMode = defaultGestureMode,
    overDrag = true,
    safeTopOffset = defaultSafeTopOffset,
    onBackPress = null,
    // enableDragWhenKeyboardOpened = false,
  } = props;

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(screenHeight)).current;
  const lastPosition = useRef<number>(initialHeight);
  const currentIndex = useRef<number>(initialIndex);

  const checkIfAvailable = (index: number) => {
    if (!enableSnapping || snapPoints.length <= index || index < 0) {
      return false;
    }
    return true;
  };

  const handleOpen = (sheetHeight: number = initialHeight) => {
    const _val = enableSnapping ? snapPoints[initialIndex] : sheetHeight;
    lastPosition.current = _val;
    setModalVisible(true);
    Animated.timing(animatedHeight, {
      useNativeDriver: true,
      toValue: screenHeight - _val,
      easing: Easing.out(Easing.back(1)),
      duration: openDuration,
    }).start(({finished}) => {
      if (finished) {
        onOpen && onOpen();
      }
    });
  };

  useEffect(() => {
    openOnMount && handleOpen();
  }, []);

  const handleClose = () => {
    Animated.timing(animatedHeight, {
      useNativeDriver: true,
      toValue: screenHeight,
      easing: Easing.in(Easing.ease),
      duration: closeDuration,
    }).start(() => {
      onClose && onClose();
      setModalVisible(false);
      currentIndex.current = 0;
    });
  };

  const handleSnapToIndex = (index: number) => {
    if (!checkIfAvailable(index)) {
      throw Error('Provided index is out of range of snapPoints!');
    }
    if (!keyboardOpen) {
      lastPosition.current = snapPoints[index];
      currentIndex.current = index;
      Animated.spring(animatedHeight, {
        useNativeDriver: true,
        toValue: screenHeight - snapPoints[index],
      }).start();
    }
  };

  const handleSnapToPosition = (
    position: number,
    config?: SnapToPositionConfig,
  ) => {
    const {resetLastPosition = true} = config || {};
    if (!modalVisible) {
      return console.warn(
        'snapToPosition can be used only when bottom drawer is opened',
      );
    }
    if (resetLastPosition) {
      lastPosition.current = position;
    }
    Animated.spring(animatedHeight, {
      useNativeDriver: true,
      toValue: screenHeight - position,
    }).start();
  };

  const {keyboardOpen} = useBottomDrawerKeyboard({
    modalVisible,
    lastPosition,
    handleSnapToPosition,
    safeTopOffset,
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        const {dy} = gestureState;
        let offset = 0;
        if (dy < 0) {
          if (enableSnapping) {
            if (currentIndex.current + 1 === snapPoints.length) {
              offset = overDrag ? dy / 6 : 0;
            } else {
              offset = dy;
            }
          } else {
            offset = overDrag ? dy / 6 : 0;
          }
        } else {
          offset = dy;
        }
        if (lastPosition.current + offset * -1 + safeTopOffset < screenHeight) {
          animatedHeight.setOffset(offset);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        animatedHeight.flattenOffset();
        const {dy} = gestureState;
        if (dy < -safeTopOffset && checkIfAvailable(currentIndex.current + 1)) {
          return handleSnapToIndex(currentIndex.current + 1);
        }
        if (dy > safeTopOffset) {
          if (checkIfAvailable(currentIndex.current - 1)) {
            return handleSnapToIndex(currentIndex.current - 1);
          }
          if (closeOnDragDown) {
            return handleClose();
          }
        }
        Animated.spring(animatedHeight, {
          toValue: screenHeight - lastPosition.current,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  const handleIsOpen = () => modalVisible;

  const bottomSheetMethods = {
    open: handleOpen,
    snapToPosition: handleSnapToPosition,
    snapToIndex: handleSnapToIndex,
    close: handleClose,
    isOpen: handleIsOpen,
  };

  useImperativeHandle(ref, (): any => bottomSheetMethods);

  const handleKeyboardAndDrawerClose = (
    source: 'backPress' | 'backDrop',
    drawerClose: boolean,
  ) => {
    if (source === 'backPress' && onBackPress) {
      onBackPress();
    } else if (source === 'backDrop' && onBackdropPress) {
      onBackdropPress();
    }
    if (keyboardOpen) {
      Keyboard.dismiss();
    } else {
      drawerClose && handleClose();
    }
  };

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={modalVisible}
      onRequestClose={() => {
        handleKeyboardAndDrawerClose('backPress', closeOnPressBack);
      }}>
      <Animated.View
        style={{
          opacity: animatedHeight.interpolate({
            inputRange: [screenHeight - lastPosition.current, screenHeight],
            outputRange: [backdropOpacity, 0],
            extrapolate: 'clamp',
          }),
          flex: 1,
        }}>
        <Pressable
          style={{flex: 1, backgroundColor: backdropColor}}
          onPress={() => {
            handleKeyboardAndDrawerClose('backDrop', closeOnBackdropPress);
          }}
        />
      </Animated.View>
      <Animated.View
        {...(gestureMode === 'content' && panResponder.panHandlers)}
        style={[
          styles.container,
          customStyles.container,
          {transform: [{translateY: animatedHeight}]},
        ]}>
        <View
          {...(gestureMode === 'handle' && panResponder.panHandlers)}
          style={[styles.handleContainer, customStyles.handleContainer]}>
          <View style={[styles.handle, customStyles.handle]} />
        </View>
        <BottomSheetContext.Provider value={bottomSheetMethods}>
          {children}
        </BottomSheetContext.Provider>
      </Animated.View>
    </Modal>
  );
};

export default forwardRef(BottomDrawer);
