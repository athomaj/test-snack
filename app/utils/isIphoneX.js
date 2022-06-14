import { Dimensions, Platform } from 'react-native';

export function isIphoneX() {
  const dim = Dimensions.get('window');
  
  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim))
  );
}

export function isIphoneMax() {
  const dim = Dimensions.get('window');
  
  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    
    // Check either, iPhone X or XR
    (isIPhoneXrSize(dim))
  );
}

export function isBigScreen() {
  const dim = Dimensions.get('window');
  return dim.height >= 812 || dim.width >= 812;
}

function isIPhoneXSize(dim) {
  return dim.height >= 812 || dim.width >= 812;
}

function isIPhoneXrSize(dim) {
  return dim.height >= 896 || dim.width >= 896;
}

export const HEADER_SIZE = isIphoneX() ? 102 : 80;