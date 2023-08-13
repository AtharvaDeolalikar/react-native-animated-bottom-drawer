import {useEffect, useState} from 'react';
import {Platform, Keyboard} from 'react-native';
import {UseBottomDrawerKeyboard, UseKeyboardDrawerProps} from '../..';
import {getKeyboardOffset} from '../utils';

const useBottomDrawerKeyboard = (
  props: UseKeyboardDrawerProps,
): UseBottomDrawerKeyboard => {
  const {modalVisible, lastPosition, handleSnapToPosition, safeTopOffset} =
    props;
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      if (Platform.OS == 'ios') {
        const iosShowSubscription = Keyboard.addListener(
          'keyboardWillShow',
          e => {
            let offset = getKeyboardOffset(
              lastPosition.current,
              e.endCoordinates.height,
              safeTopOffset,
            );
            handleSnapToPosition(offset, {
              resetLastPosition: false,
            });
            setKeyboardOpen(true);
          },
        );
        const iosHideSubscription = Keyboard.addListener(
          'keyboardWillHide',
          e => {
            handleSnapToPosition(lastPosition.current);
            setKeyboardOpen(false);
          },
        );
        return () => {
          iosShowSubscription.remove();
          iosHideSubscription.remove();
        };
      }

      if (Platform.OS === 'android') {
        const androidShowSubscription = Keyboard.addListener(
          'keyboardDidShow',
          e => {
            let offset = getKeyboardOffset(
              lastPosition.current,
              e.endCoordinates.height,
              safeTopOffset,
            );
            handleSnapToPosition(offset, {
              resetLastPosition: false,
            });
            setKeyboardOpen(true);
          },
        );
        const androidHideSubscription = Keyboard.addListener(
          'keyboardDidHide',
          e => {
            handleSnapToPosition(lastPosition.current);
            setKeyboardOpen(false);
          },
        );
        return () => {
          androidShowSubscription.remove();
          androidHideSubscription.remove();
        };
      }
    }
  }, [modalVisible]);
  return {keyboardOpen};
};

export default useBottomDrawerKeyboard;
