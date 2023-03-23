import {
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
  Dimensions,
  Pressable,
  Easing,
  Keyboard,
} from 'react-native';

import {styles} from './styles';
import {BottomSheetMethods, BottomSheetWithRef} from './type';
import {BottomSheetContext} from './useBottomSheet';

const screenHeight = Dimensions.get('window').height;

const BottomSheet: ForwardRefRenderFunction<
  BottomSheetMethods,
  BottomSheetWithRef
> = (props, ref) => {
  const {
    onClose = null,
    openDuration = 450,
    closeDuration = 300,
    customStyles = {handleContainer: {}, handle: {}, container: {}},
    onOpen = null,
    closeOnDragDown = true,
    closeOnPressBack = true,
    backdropOpacity = 0.5,
    onBackdropPress = null,
    closeOnBackdropPress = true,
    initialHeight = 420,
    children,
    openOnMount = false,
    backdropColor = '#000',
    snapPoints = [],
    initialIndex = 0,
    enableSnapping = false,
  } = props;

  const [modalVisible, setModalVisible] = useState<boolean>(openOnMount);
  const animatedHeight = useRef(new Animated.Value(screenHeight)).current;
  const lastPosition = useRef<number>(initialHeight);
  const currentIndex = useRef<number>(initialIndex);

  const checkIfAvailable = (index: number) => {
    if (!enableSnapping || snapPoints.length == index || index < 0) {
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

  const handleClose = () => {
    Keyboard.dismiss();
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
    lastPosition.current = snapPoints[index];
    currentIndex.current = index;
    Animated.spring(animatedHeight, {
      useNativeDriver: true,
      toValue: screenHeight - snapPoints[index],
    }).start();
  };

  const handleSnapToPosition = (position: number, type: string) => {
    lastPosition.current = position;
    if (type === 'timing') {
      Animated.timing(animatedHeight, {
        useNativeDriver: true,
        duration: 300,
        toValue: screenHeight - position,
      }).start();
    }
    Animated.spring(animatedHeight, {
      useNativeDriver: true,
      toValue: screenHeight - position,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        const {dy} = gestureState;
        const output = dy / 6;
        animatedHeight.setOffset(output);
      },
      onPanResponderRelease: (evt, gestureState) => {
        animatedHeight.flattenOffset();
        const {dy} = gestureState;
        if (dy < -50 && checkIfAvailable(currentIndex.current + 1)) {
          return handleSnapToIndex(currentIndex.current + 1);
        }
        if (dy > 50) {
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

  useEffect(() => {
    // Platform.OS == 'ios' &&
    //     Keyboard.addListener('keyboardWillShow', e => {
    //         const keyboardHeight = e.endCoordinates.height;

    //         handleSnapToPosition(keyboardHeight + snapPoints[0], 'timing');

    //         // if(lastPosition.current + e.endCoordinates.height )
    //     });
    // Platform.OS == 'android' &&
    //     Keyboard.addListener('keyboardDidShow', e => {
    //         const keyboardHeight = e.endCoordinates.height;

    //         handleSnapToPosition(keyboardHeight + snapPoints[0], 'timing');
    //     });

    openOnMount && handleOpen();
  }, []);

  const bottomSheetMethods = {
    open: handleOpen,
    snapToPosition: handleSnapToPosition,
    snapToIndex: handleSnapToIndex,
    close: handleClose,
    isOpen: handleIsOpen,
  };

  useImperativeHandle(ref, (): any => bottomSheetMethods);

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={modalVisible}
      onRequestClose={() => {
        closeOnPressBack && handleClose();
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
            onBackdropPress && onBackdropPress();
            closeOnBackdropPress && handleClose();
          }}
        />
      </Animated.View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.container,
          customStyles.container,
          {transform: [{translateY: animatedHeight}]},
        ]}>
        <View style={[styles.handleContainer, customStyles.handleContainer]}>
          <View style={[styles.handle, customStyles.handle]} />
        </View>
        <BottomSheetContext.Provider value={bottomSheetMethods}>
          {children}
        </BottomSheetContext.Provider>
      </Animated.View>
    </Modal>
  );
};

export default forwardRef(BottomSheet);
