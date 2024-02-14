import {Dimensions} from 'react-native';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

const BaseWidth = deviceHeight < 600 ? 480 : 360;

const scale = size => (deviceWidth / BaseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const responsive = {
  fontSize: size => moderateScale(size, deviceHeight < 600 ? 0.8 : 0.5),
  number: n => moderateScale(n, deviceHeight < 600 ? 0.5 : 1),
  deviceWidth,
  deviceHeight,
};
