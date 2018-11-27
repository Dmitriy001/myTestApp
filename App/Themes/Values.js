import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const values = {
    screenWidth: width,
    screenHeight: height,
};

export default values;
