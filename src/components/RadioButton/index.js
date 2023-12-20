import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Animated,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Easing,
  Platform,
} from 'react-native';
import {responsive} from '../../utils/responsive';
import {theme} from '../../utils/theme';

const Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

export const RadioButton = ({selected, onPress}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: selected ? 100 : 0,
      easing: Easing.ease,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [selected, animatedValue]);

  const interpolateScale = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  });

  const innerCirleStyle = {
    transform: [{scale: interpolateScale}],
  };

  return (
    <View style={styles.wrapper}>
      <Touchable
        onPress={onPress}
        hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}
        background={TouchableNativeFeedback.Ripple(theme.colors.primary, true)}>
        <View style={styles.container}>
          <View style={styles.cirle}>
            <Animated.View style={[styles.innerCirle, innerCirleStyle]} />
          </View>
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsive.number(16),
    width: responsive.number(32),
    height: responsive.number(32),
  },
  container: {
    width: responsive.number(24),
    height: responsive.number(24),
    borderRadius: responsive.number(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  cirle: {
    width: responsive.number(18),
    height: responsive.number(18),
    borderRadius: responsive.number(9),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerCirle: {
    width: responsive.number(12),
    height: responsive.number(12),
    borderRadius: responsive.number(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
});
