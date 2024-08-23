import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const stylesRunas = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.02,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  mesa: {
    position: 'absolute',
    width: screenWidth * 0.8,
    height: screenHeight * 0.3,
    resizeMode: 'contain',
  },
  robo: {
    position: 'absolute',
    width: screenWidth * 0.5,
    height: screenHeight * 0.3,
    resizeMode: 'contain',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  runasContainer: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  runa: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: screenWidth * 0.15,
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lastElementsContainer: {
    position: 'absolute',
    right: screenWidth * 0.1,
    top: screenHeight * 0.55,
    alignItems: 'flex-end',
  },
  lastElementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lastElementsList: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  smallElement: {
    width: screenWidth * 0.13,
    height: screenWidth * 0.13,
    borderRadius: screenWidth * 0.065,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  smallImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default stylesRunas;
