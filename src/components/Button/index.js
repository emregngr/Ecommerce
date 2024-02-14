import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {theme} from '../../utils/theme';
import {responsive} from '../../utils/responsive';

export const Button = ({label, style, disabled = false, ...rest}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        {
          backgroundColor: disabled ? theme.colors.gray : theme.colors.primary,
        },
      ]}
      hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
      disabled={disabled}
      {...rest}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: responsive.number(56),
    borderRadius: responsive.number(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: responsive.fontSize(16),
    lineHeight: responsive.number(24),
    letterSpacing: responsive.number(0.1),
    fontWeight: 'bold',
  },
});
