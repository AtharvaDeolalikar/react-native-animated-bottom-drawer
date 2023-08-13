import {ForwardRefExoticComponent, ReactNode, Ref} from 'react';
import {ViewStyle} from 'react-native/types';

export type SnapToPosition = (
  sheetHeight: number,
  config?: SnapToPositionConfig,
) => void;

export type UseBottomDrawerKeyboard = {keyboardOpen: boolean};

export interface BottomDrawerMethods {
  open(sheetHeight?: number): void;
  close(): void;
  snapToPosition: SnapToPosition;
  snapToIndex: (index: number) => void;
}

export interface BottomDrawerWithRef extends BottomDrawerProps {
  ref: Ref<BottomDrawerMethods>;
}

export type BottomDrawerProps = {
  onBackdropPress?: () => void;
  openDuration?: number;
  closeDuration?: number;
  closeOnDragDown?: boolean;
  closeOnBackdropPress?: boolean;
  closeOnPressBack?: boolean;
  customStyles?: {
    handle?: ViewStyle;
    handleContainer?: ViewStyle;
    container?: ViewStyle;
  };
  onClose?: () => void;
  onOpen?: () => void;
  onBackPress?: () => void;
  children: ReactNode;
  openOnMount?: boolean;
  initialHeight?: number;
  backdropOpacity?: number;
  backdropColor?: string;
  snapPoints?: number[];
  initialIndex?: number;
  enableSnapping?: boolean;
  gestureMode?: 'content' | 'handle' | 'none';
  overDrag?: boolean;
  safeTopOffset?: number;
  // enableDragWhenKeyboardOpened?: boolean;
};

export type SnapToPositionConfig = {
  resetLastPosition?: boolean;
};

export type UseKeyboardDrawerProps = {
  modalVisible: boolean;
  lastPosition: {current: number};
  handleSnapToPosition: SnapToPosition;
  safeTopOffset: number;
};

declare const BottomDrawer: ForwardRefExoticComponent<
  Omit<BottomDrawerWithRef, 'ref'> & React.RefAttributes<BottomDrawerMethods>
>;
export default BottomDrawer;
