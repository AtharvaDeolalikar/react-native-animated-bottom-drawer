import {useRef} from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import BottomDrawer, {
  BottomSheetMethods,
} from 'react-native-animated-bottom-drawer';

const App = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>();
  return (
    <SafeAreaView>
      <Text>ABC</Text>
      <Button title="Open" onPress={() => bottomSheetRef.current.open()} />
      <BottomDrawer ref={bottomSheetRef}>
        <Text>ABC</Text>
      </BottomDrawer>
    </SafeAreaView>
  );
};

export default App;
