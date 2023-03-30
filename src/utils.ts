import {screenHeight} from './constants';

export const getKeyboardOffset = (
  lastPosition: number,
  keyboardHeight: number,
  safeTopOffset: number,
) => {
  if (lastPosition + keyboardHeight > screenHeight) {
    return screenHeight - safeTopOffset;
  } else {
    return lastPosition + keyboardHeight;
  }
};
