import {ReactNode, Ref} from 'react';
import {ViewStyle} from 'react-native/types';

export interface BottomDrawerMethods {
  open(sheetHeight?: number): void;
  close(): void;
  snapToPosition: (sheetHeight: number, type?: string) => void;
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
};
