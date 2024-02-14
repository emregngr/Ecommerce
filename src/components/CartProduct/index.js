import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {responsive} from '../../utils/responsive';
import Minus from '../../assets/icons/minus.svg';
import Plus from '../../assets/icons/plus.svg';
import {theme} from '../../utils/theme';
import {useEcom} from '../../hooks';

export const CartProduct = ({product}) => {
  const {addToCart, removeFromCart} = useEcom();

  const {name, price} = product || {};

  const {quantity, ...rest} = product;

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.text} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.text}>{price}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.minusPlusContainer}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          onPress={() => removeFromCart(rest)}>
          <Minus />
        </TouchableOpacity>
        <View style={styles.numberTextContainer}>
          <Text style={styles.numberText}>{quantity}</Text>
        </View>
        <TouchableOpacity
          style={styles.minusPlusContainer}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          onPress={() => addToCart(rest)}>
          <Plus />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.number(16),
    marginBottom: responsive.number(15),
  },
  leftContainer: {
    width: '45%',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: responsive.number(8),
    backgroundColor: '#F1F3F5',
  },
  text: {
    color: theme.colors.black,
    fontSize: responsive.fontSize(16),
    lineHeight: responsive.number(24),
    letterSpacing: responsive.number(0.1),
  },
  minusPlusContainer: {
    width: responsive.number(50),
    height: responsive.number(43),
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberTextContainer: {
    width: responsive.number(60),
    height: responsive.number(43),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  numberText: {
    color: theme.colors.white,
    fontSize: responsive.fontSize(16),
    lineHeight: responsive.number(24),
    letterSpacing: responsive.number(0.1),
  },
});
