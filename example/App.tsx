import React, {useRef} from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView} from 'react-native';
import BottomDrawer, {
  BottomDrawerMethods,
} from 'react-native-animated-bottom-drawer';

const App = () => {
  // ref
  const bottomDrawerRef = useRef<BottomDrawerMethods>(null);

  // renders
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Open" onPress={() => bottomDrawerRef.current.open()} />
      <BottomDrawer
        ref={bottomDrawerRef}
        openOnMount
        enableSnapping
        snapPoints={[300, 500]}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
          <Button
            title="Snap"
            onPress={() => bottomDrawerRef.current.snapToIndex(3)}
          />
        </View>
      </BottomDrawer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
