import {Dimensions, StyleSheet} from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 20,
    height: screenHeight,
  },
  handleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  handle: {
    backgroundColor: '#D9D9D9',
    width: 45,
    height: 5,
    borderRadius: 10,
  },
});
