import {createContext, useContext} from 'react';
import {BottomDrawerMethods} from '../..';

export const BottomSheetContext = createContext<BottomDrawerMethods>(null!);

const useBottomDrawer = () => {
  const currentBottomSheetContext = useContext(BottomSheetContext);
  if (!currentBottomSheetContext) {
    throw new Error('useBottomDrawer has to be used within BottomDrawer only');
  }
  return currentBottomSheetContext;
};

export default useBottomDrawer;
