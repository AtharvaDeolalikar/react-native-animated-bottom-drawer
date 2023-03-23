import {createContext, useContext} from 'react';
import {BottomSheetMethods} from './type';

export const BottomSheetContext = createContext<BottomSheetMethods>(null!);

const useBottomSheet = () => {
  const currentBottomSheetContext = useContext(BottomSheetContext);

  if (!currentBottomSheetContext) {
    throw new Error('useBottomSheet has to be used within BottomSheet only');
  }

  return currentBottomSheetContext;
};

export default useBottomSheet;
